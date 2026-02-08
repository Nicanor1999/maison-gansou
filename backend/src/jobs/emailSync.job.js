/**
 * Email Sync Job
 * Periodically fetches emails from IMAP and stores them in the database
 */

const ImapServices = require('../shared/services/imap.services');

class EmailSyncJob {
    static _intervalId = null;
    static _isRunning = false;

    /**
     * Get sync interval from environment (default: 5 minutes)
     */
    static getSyncInterval() {
        return parseInt(process.env.ZOHO_IMAP_SYNC_INTERVAL || '300000');
    }

    /**
     * Check if sync is enabled
     */
    static isEnabled() {
        return process.env.ZOHO_IMAP_SYNC_ENABLED === 'true';
    }

    /**
     * Run sync job once
     */
    static async runOnce() {
        if (this._isRunning) {
            console.log('[EmailSyncJob] Already running, skipping...');
            return null;
        }

        if (!ImapServices.isConfigured()) {
            console.log('[EmailSyncJob] IMAP not configured, skipping...');
            return null;
        }

        this._isRunning = true;
        console.log('[EmailSyncJob] Starting email sync...');

        try {
            const result = await ImapServices.syncEmails({
                limit: 100,
                since: this.getLastSyncDate()
            });

            // Update last sync date
            this.setLastSyncDate(new Date());

            console.log('[EmailSyncJob] Sync completed:', result);
            return result;
        } catch (err) {
            console.error('[EmailSyncJob] Error:', err.message);
            return { success: false, error: err.message };
        } finally {
            this._isRunning = false;
        }
    }

    /**
     * Get last sync date from cache (in-memory for now)
     */
    static _lastSyncDate = null;

    static getLastSyncDate() {
        if (!this._lastSyncDate) {
            // Default: 7 days ago for first sync
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            return sevenDaysAgo;
        }
        return this._lastSyncDate;
    }

    static setLastSyncDate(date) {
        this._lastSyncDate = date;
    }

    /**
     * Start the periodic sync job
     */
    static start() {
        if (!this.isEnabled()) {
            console.log('[EmailSyncJob] Sync is disabled');
            return;
        }

        if (!ImapServices.isConfigured()) {
            console.log('[EmailSyncJob] IMAP not configured');
            return;
        }

        if (this._intervalId) {
            console.log('[EmailSyncJob] Already started');
            return;
        }

        const interval = this.getSyncInterval();
        console.log(`[EmailSyncJob] Starting with interval: ${interval}ms`);

        // Run immediately on start
        setTimeout(() => this.runOnce(), 5000); // Wait 5 seconds after app start

        // Then run periodically
        this._intervalId = setInterval(() => this.runOnce(), interval);
    }

    /**
     * Stop the periodic sync job
     */
    static stop() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
            console.log('[EmailSyncJob] Stopped');
        }
    }

    /**
     * Get job status
     */
    static getStatus() {
        return {
            enabled: this.isEnabled(),
            configured: ImapServices.isConfigured(),
            running: this._isRunning,
            started: !!this._intervalId,
            interval: this.getSyncInterval(),
            lastSync: this._lastSyncDate
        };
    }
}

module.exports = EmailSyncJob;
