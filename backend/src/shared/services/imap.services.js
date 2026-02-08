/**
 * IMAP Email Sync Service
 * Fetches emails from Zoho Mail and stores them in the Message collection
 */

const Imap = require('imap');
const { simpleParser } = require('mailparser');
const Message = require('../../modules/admin/models/message.model');

class ImapServices {
    static _imap = null;
    static _isConnected = false;
    static _isSyncing = false;

    /**
     * Get IMAP configuration from environment
     */
    static getConfig() {
        return {
            user: process.env.ZOHO_IMAP_USERNAME,
            password: process.env.ZOHO_IMAP_PASSWORD,
            host: process.env.ZOHO_IMAP_HOST || 'imap.zoho.com',
            port: parseInt(process.env.ZOHO_IMAP_PORT || '993'),
            tls: true,
            tlsOptions: { rejectUnauthorized: false }
        };
    }

    /**
     * Check if IMAP is properly configured
     */
    static isConfigured() {
        const config = this.getConfig();
        return !!(config.user && config.password && config.host);
    }

    /**
     * Create IMAP connection
     */
    static createConnection() {
        if (!this.isConfigured()) {
            console.log('[IMAP] Not configured - missing credentials');
            return null;
        }

        const config = this.getConfig();
        return new Imap(config);
    }

    /**
     * Connect to IMAP server
     */
    static connect() {
        return new Promise((resolve, reject) => {
            if (this._isConnected && this._imap) {
                return resolve(this._imap);
            }

            this._imap = this.createConnection();
            if (!this._imap) {
                return reject(new Error('IMAP not configured'));
            }

            this._imap.once('ready', () => {
                console.log('[IMAP] Connected to server');
                this._isConnected = true;
                resolve(this._imap);
            });

            this._imap.once('error', (err) => {
                console.error('[IMAP] Connection error:', err.message);
                this._isConnected = false;
                reject(err);
            });

            this._imap.once('end', () => {
                console.log('[IMAP] Connection ended');
                this._isConnected = false;
            });

            this._imap.connect();
        });
    }

    /**
     * Disconnect from IMAP server
     */
    static disconnect() {
        if (this._imap && this._isConnected) {
            this._imap.end();
            this._isConnected = false;
            this._imap = null;
        }
    }

    /**
     * Open mailbox (INBOX by default)
     */
    static openBox(boxName = 'INBOX', readOnly = true) {
        return new Promise((resolve, reject) => {
            if (!this._imap) {
                return reject(new Error('Not connected'));
            }

            this._imap.openBox(boxName, readOnly, (err, box) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(box);
                }
            });
        });
    }

    /**
     * Search for emails with criteria
     */
    static search(criteria) {
        return new Promise((resolve, reject) => {
            if (!this._imap) {
                return reject(new Error('Not connected'));
            }

            this._imap.search(criteria, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results || []);
                }
            });
        });
    }

    /**
     * Fetch email by UID
     */
    static fetchEmail(uid) {
        return new Promise((resolve, reject) => {
            if (!this._imap) {
                return reject(new Error('Not connected'));
            }

            const fetch = this._imap.fetch(uid, {
                bodies: '',
                struct: true
            });

            let email = null;

            fetch.on('message', (msg) => {
                msg.on('body', (stream) => {
                    simpleParser(stream, (err, parsed) => {
                        if (err) {
                            console.error('[IMAP] Parse error:', err.message);
                        } else {
                            email = parsed;
                        }
                    });
                });

                msg.once('attributes', (attrs) => {
                    if (email) {
                        email.uid = attrs.uid;
                        email.flags = attrs.flags;
                    }
                });
            });

            fetch.once('error', (err) => {
                reject(err);
            });

            fetch.once('end', () => {
                resolve(email);
            });
        });
    }

    /**
     * Fetch multiple emails by UIDs
     */
    static async fetchEmails(uids) {
        const emails = [];

        for (const uid of uids) {
            try {
                const email = await this.fetchEmail(uid);
                if (email) {
                    emails.push(email);
                }
            } catch (err) {
                console.error(`[IMAP] Error fetching email UID ${uid}:`, err.message);
            }
        }

        return emails;
    }

    /**
     * Get the Message-ID header from an email
     */
    static getMessageId(email) {
        return email.messageId || email.headers?.get('message-id') || null;
    }

    /**
     * Check if email already exists in database by Message-ID
     */
    static async emailExists(messageId) {
        if (!messageId) return false;

        const existing = await Message.findOne({
            externalMessageId: messageId,
            deletedAt: null
        });

        return !!existing;
    }

    /**
     * Convert parsed email to Message document format
     */
    static emailToMessage(email) {
        // Extract sender info
        const from = email.from?.value?.[0] || {};
        const senderName = from.name || from.address?.split('@')[0] || 'Inconnu';
        const senderEmail = from.address || 'unknown@unknown.com';

        // Extract recipient (should be our address)
        const to = email.to?.value?.[0] || {};
        const recipientEmail = to.address || process.env.ZOHO_IMAP_USERNAME;

        // Extract subject
        const subject = email.subject || '(Sans objet)';

        // Extract content (prefer text, fallback to html stripped)
        let content = email.text || '';
        if (!content && email.html) {
            // Strip HTML tags for plain text version
            content = email.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        }

        // Extract attachments info
        const attachments = (email.attachments || []).map(att => ({
            name: att.filename || 'attachment',
            size: att.size,
            contentType: att.contentType
        }));

        // Determine category based on subject/content keywords
        let category = 'other';
        const lowerSubject = subject.toLowerCase();
        const lowerContent = content.toLowerCase();

        if (lowerSubject.includes('réservation') || lowerSubject.includes('reservation') || lowerSubject.includes('booking')) {
            category = 'booking';
        } else if (lowerSubject.includes('recrutement') || lowerSubject.includes('candidature') || lowerSubject.includes('cv')) {
            category = 'recruitment';
        } else if (lowerSubject.includes('contact') || lowerSubject.includes('demande') || lowerSubject.includes('information')) {
            category = 'contact';
        }

        return {
            senderName,
            senderEmail,
            recipientEmail,
            subject,
            content,
            category,
            direction: 'inbound',
            read: false,
            starred: false,
            archived: false,
            status: 'received',
            attachments,
            externalMessageId: this.getMessageId(email),
            receivedAt: email.date || new Date()
        };
    }

    /**
     * Sync emails from IMAP to database
     * @param {Object} options - Sync options
     * @param {number} options.limit - Maximum emails to fetch (default 50)
     * @param {Date} options.since - Only fetch emails after this date
     * @returns {Object} - Sync results
     */
    static async syncEmails(options = {}) {
        if (this._isSyncing) {
            console.log('[IMAP] Sync already in progress, skipping...');
            return { success: false, message: 'Sync already in progress' };
        }

        if (!this.isConfigured()) {
            return { success: false, message: 'IMAP not configured' };
        }

        this._isSyncing = true;
        const results = {
            success: true,
            fetched: 0,
            saved: 0,
            skipped: 0,
            errors: []
        };

        try {
            console.log('[IMAP] Starting email sync...');

            // Connect to IMAP
            await this.connect();

            // Open INBOX
            const box = await this.openBox('INBOX', true);
            console.log(`[IMAP] Mailbox opened: ${box.messages.total} messages total`);

            // Build search criteria
            const searchCriteria = ['ALL'];

            // If we have a "since" date, use it
            if (options.since) {
                searchCriteria.push(['SINCE', options.since]);
            } else {
                // Default: last 30 days
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                searchCriteria.push(['SINCE', thirtyDaysAgo]);
            }

            // Search for emails
            const uids = await this.search(searchCriteria);
            console.log(`[IMAP] Found ${uids.length} emails matching criteria`);

            // Limit the number of emails to process
            const limit = options.limit || 50;
            const uidsToFetch = uids.slice(-limit); // Get the most recent ones

            results.fetched = uidsToFetch.length;

            // Fetch and process emails
            for (const uid of uidsToFetch) {
                try {
                    const email = await this.fetchEmail(uid);
                    if (!email) continue;

                    const messageId = this.getMessageId(email);

                    // Check if already exists
                    if (await this.emailExists(messageId)) {
                        results.skipped++;
                        continue;
                    }

                    // Convert to message format
                    const messageData = this.emailToMessage(email);

                    // Save to database
                    await Message.create(messageData);
                    results.saved++;
                    console.log(`[IMAP] Saved email: ${messageData.subject}`);

                } catch (err) {
                    console.error(`[IMAP] Error processing email UID ${uid}:`, err.message);
                    results.errors.push(err.message);
                }
            }

            console.log(`[IMAP] Sync complete: ${results.saved} saved, ${results.skipped} skipped`);

        } catch (err) {
            console.error('[IMAP] Sync error:', err.message);
            results.success = false;
            results.errors.push(err.message);
        } finally {
            this.disconnect();
            this._isSyncing = false;
        }

        return results;
    }

    /**
     * Get sync status
     */
    static getSyncStatus() {
        return {
            configured: this.isConfigured(),
            connected: this._isConnected,
            syncing: this._isSyncing
        };
    }
}

module.exports = ImapServices;
