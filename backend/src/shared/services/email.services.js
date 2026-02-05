/**
 * @EmailServices
 */
const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
module.exports = class EmailServices {

  constructor() {

  }

  // ZeptoMail transporter (transactional emails)
  static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_USE_SSL == "true" ? true : false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  // Zoho Mail transporter (professional emails - compose/reply)
  static _zohoTransporter = null;
  static getZohoTransporter() {
    if (this._zohoTransporter) return this._zohoTransporter;
    const host = process.env.ZOHO_SMTP_HOST;
    const port = process.env.ZOHO_SMTP_PORT;
    const user = process.env.ZOHO_SMTP_USERNAME;
    const pass = process.env.ZOHO_SMTP_PASSWORD;
    if (!host || !port || !user || !pass) return null;
    this._zohoTransporter = nodemailer.createTransport({
      host,
      port: parseInt(port),
      secure: parseInt(port) === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });
    return this._zohoTransporter;
  }

  /**
   * @buildSubjectForLog - Build a human-readable subject matching the actual email subject
   */
  static buildSubjectForLog(locals, template) {
    if (locals.subject) return locals.subject;
    switch (template) {
      case 'payment-confirmation':
        return `Confirmation de paiement - Réservation #${locals.reservationId || ''}`;
      case 'verify-email':
        return 'Vérification de votre adresse email';
      case 'mfa-email':
        return 'Code de vérification (MFA)';
      case 'security-alert':
        return 'Alerte de sécurité';
      case 'password-restoration-code':
        return 'Réinitialisation de mot de passe';
      default:
        return `${template} - ${locals.recipientEmail || ''}`;
    }
  }

  /**
   * @buildContentForLog - Build human-readable content matching the actual email body
   */
  static buildContentForLog(locals, template) {
    if (locals.content) return locals.content;
    switch (template) {
      case 'payment-confirmation':
        return `Confirmation de paiement\n\nBonjour ${locals.clientName || 'Client'},\n\nNous vous confirmons que votre paiement a bien été reçu. Voici le récapitulatif de votre réservation :\n\nRéservation : #${locals.reservationId || ''}\nLogement : ${locals.offerTitle || ''}\nDate d'arrivée : ${locals.startDate || ''}\nDate de départ : ${locals.arrivalDate || ''}\nMontant payé : ${locals.amount || ''} FCFA\nTransaction : ${locals.transactionId || ''}\n\nSi vous avez des questions concernant votre réservation, n'hésitez pas à nous contacter.\n\nCordialement,\nMaison GANSOU`;
      case 'verify-email':
        return `Vérification de votre adresse email\n\nBonjour,\n\nVeuillez utiliser le code suivant pour vérifier votre adresse email : ${locals.code || locals.token || ''}\n\nCordialement,\nMaison GANSOU`;
      case 'mfa-email':
        return `Code de vérification\n\nBonjour,\n\nVotre code de vérification MFA est : ${locals.code || locals.token || ''}\n\nCordialement,\nMaison GANSOU`;
      case 'security-alert':
        return `Alerte de sécurité\n\nBonjour,\n\nUne activité inhabituelle a été détectée sur votre compte.\n\n${locals.message || locals.details || ''}\n\nCordialement,\nMaison GANSOU`;
      case 'password-restoration-code':
        return `Réinitialisation de mot de passe\n\nBonjour,\n\nVotre code de réinitialisation est : ${locals.code || locals.token || ''}\n\nCordialement,\nMaison GANSOU`;
      default:
        return Object.entries(locals)
          .filter(([key]) => !['year'].includes(key))
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
    }
  }

  /**
   * @logEmail - Save email to Message model for mailbox tracking
   */
  static async logEmail(recipientEmail, locals, template, status, attachments = []) {
    try {
      const Message = require('../../modules/admin/models/message.model');

      const fromName = process.env.SMTP_FROM_NAME || 'Maison GANSOU';
      const fromEmail = process.env.SMTP_FROM_ADDRESS || 'noreply@maisongansou.com';

      // Determine category from template name
      let category = 'system';
      if (template.includes('payment')) category = 'booking';
      if (template.includes('verify') || template.includes('mfa') || template.includes('security') || template.includes('password')) category = 'system';
      if (template.includes('reply')) category = 'contact';

      const subject = this.buildSubjectForLog(locals, template);
      const content = this.buildContentForLog(locals, template);

      await Message.create({
        senderName: fromName,
        senderEmail: fromEmail,
        recipientEmail: recipientEmail,
        subject: subject,
        content: content,
        category: category,
        direction: 'outbound',
        read: true,
        status: status,
        template: template,
        attachments: attachments.map(a => ({
          name: a.filename || a.name || 'attachment',
          url: a.path || a.href || ''
        })),
      });
    } catch (logError) {
      console.error('Failed to log email to Message model:', logError.message);
    }
  }

  /**
   * @sendEmail - Send transactional email via ZeptoMail
   * @param {Object} options - { skipLog: true } to skip automatic logging
   */
  static async sendEmail(email, locals, template, attachments = [], options = {}) {
    try {
      // Validate inputs
      if (!email || !template) {
        throw new Error("Both 'email' and 'template' parameters are required.");
      }

      const emailObj = new Email({
        message: {
          from: {
            name: process.env.SMTP_FROM_NAME || process.env.APP_NAME,
            address: process.env.SMTP_FROM_ADDRESS,
          },
        },
        send: true,
        transport: this.transporter,
        views: {
          root: path.resolve(path.dirname(__dirname), 'snippets/email_markup/templates/'),
          options: {
            extension: 'njk',
          },
        },
        preview: false,
      });

      // Send the email
      const mail = await emailObj.send({
        template,
        message: {
          to: email,
          attachments
        },
        locals: {
          ...locals
        },
      });

      // Log successful email to Message model (unless skipLog)
      if (!options.skipLog) {
        await this.logEmail(email, locals, template, 'sent', attachments);
      }

      return {
        success: true,
        data: mail,
      };

    } catch (error) {
      // Log failed email to Message model (unless skipLog)
      if (!options.skipLog) {
        await this.logEmail(email, locals || {}, template || 'unknown', 'failed', attachments);
      }

      // Log error details
      if (process.env.NODE_ENV === 'development') {
        console.error("Email failed to send:", {
          email,
          locals,
          error: error.message,
        });
      }

      // Suppress errors based on environment variable
      if (process.env.EMAIL_SUPPRESS_ERRORS === 'true') {
        return {
          success: false,
          error: error.message,
        };
      }

      // Re-throw the error if suppression is disabled
      throw error;
    }
  }

  /**
   * @sendDirectEmail - Send email via Zoho Mail (for compose/reply from admin)
   */
  static async sendDirectEmail(email, subject, content, attachments = []) {
    try {
      if (!email || !subject || !content) {
        throw new Error("'email', 'subject' and 'content' parameters are required.");
      }

      const zohoTransporter = this.getZohoTransporter();
      if (!zohoTransporter) {
        throw new Error('Zoho Mail SMTP non configuré. Veuillez ajouter les variables ZOHO_SMTP_* dans le fichier .env');
      }

      const fromAddress = process.env.ZOHO_SMTP_FROM_ADDRESS || process.env.ZOHO_SMTP_USERNAME;
      const fromName = process.env.ZOHO_SMTP_FROM_NAME || 'Maison GANSOU';

      const emailObj = new Email({
        message: {
          from: { name: fromName, address: fromAddress },
        },
        send: true,
        transport: zohoTransporter,
        views: {
          root: path.resolve(path.dirname(__dirname), 'snippets/email_markup/templates/'),
          options: { extension: 'njk' },
        },
        preview: false,
      });

      const mail = await emailObj.send({
        template: 'admin-reply',
        message: { to: email, attachments },
        locals: { content, subject, year: new Date().getFullYear() },
      });

      return { success: true, data: mail };

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Direct email failed to send:", { email, subject, error: error.message });
      }
      if (process.env.EMAIL_SUPPRESS_ERRORS === 'true') {
        return { success: false, error: error.message };
      }
      throw error;
    }
  }

}