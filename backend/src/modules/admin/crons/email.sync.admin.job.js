/**
 * @EmailSyncJob
 * Periodically synchronizes emails from IMAP (Zoho Mail) into the database
 */

const CoreServices = require("../../../shared/services/core.services")
const ImapServices = require('../../../shared/services/imap.services')

module.exports = class EmailSyncJob extends CoreServices {

    constructor() {
        super()
        this._lastSyncDate = null
    }

    // Run every 5 minutes
    static schedule = '*/5 * * * *'

    /**
     * Get the last sync date
     */
    getLastSyncDate() {
        if (!this._lastSyncDate) {
            // Default: 7 days ago for first sync
            const sevenDaysAgo = new Date()
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
            return sevenDaysAgo
        }
        return this._lastSyncDate
    }

    startSchedule(cron, schedule = EmailSyncJob.schedule) {
        // Check if IMAP is configured and enabled
        if (!ImapServices.isConfigured()) {
            console.log('[EmailSyncJob] IMAP not configured, skipping job registration')
            return null
        }

        if (process.env.ZOHO_IMAP_SYNC_ENABLED !== 'true') {
            console.log('[EmailSyncJob] Email sync is disabled')
            return null
        }

        const job = cron.schedule(schedule, async () => {
            console.log('[EmailSyncJob] Running email sync...')
            try {
                const result = await ImapServices.syncEmails({
                    limit: 100,
                    since: this.getLastSyncDate()
                })

                if (result.success) {
                    this._lastSyncDate = new Date()
                    console.log(`[EmailSyncJob] Sync complete: ${result.saved} new, ${result.skipped} skipped`)
                } else {
                    console.error('[EmailSyncJob] Sync failed:', result.errors)
                }
            } catch (error) {
                console.error('[EmailSyncJob] Error:', error.message)
            }
        })

        // Also run once on startup after a short delay
        setTimeout(async () => {
            console.log('[EmailSyncJob] Running initial sync...')
            try {
                const result = await ImapServices.syncEmails({
                    limit: 100,
                    since: this.getLastSyncDate()
                })
                if (result.success) {
                    this._lastSyncDate = new Date()
                    console.log(`[EmailSyncJob] Initial sync complete: ${result.saved} new, ${result.skipped} skipped`)
                }
            } catch (error) {
                console.error('[EmailSyncJob] Initial sync error:', error.message)
            }
        }, 10000) // Wait 10 seconds after app start

        return {
            stop: () => job.stop(),
        }
    }
}
