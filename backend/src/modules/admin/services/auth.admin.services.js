/**
 * @AdminAuthServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class AdminAuthServices extends CoreServices {

  constructor() {
    super();
    this.Admin = require('../models/admin.model')
    this.IdentifierAuthEnum = require("../../auth/enums/identity.auth.enum");
    this.AuthServices = new(require("../../auth/services/auth.services"))();
    this.AdminServices = new(require("./admin.services"))();
  }
  /**
   * @verifyAccount
   */
  verifyAccount = async (payload) => {
    return this.SessionManager.executeCallbackInTransaction(async (session) => {
      try {
        const options = session ? {
          session
        } : {}

        const admin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          email: payload.email
        }), session);

        if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this account'));

        if (admin.isBlocked) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_BLOCKED);

        // verify identity 
        const identityVerificationMethod = await this.AuthServices.verifyIdentifier({
          identity: admin.identity,
          code: payload.code,
        }, session)
        if (identityVerificationMethod.verify) {
          await admin.updateOne({
            isActive: true,
          }, options)
          return true
        } else {
          throw new this.ApiError(this.ERROR_MESSAGES.INVALID_EMAIL_VERIFICATION_CODE)
        }
      } catch (error) {
        throw error;
      }
    })
  };
  /**
   * @resendAccountVerificationCode
   */
  resendAccountVerificationCode = async (payload) => {
    return this.SessionManager.executeCallbackInTransaction(async (session) => {
      try {
        const admin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          email: payload.email
        }), session);

        if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this account'));

        if (admin.isBlocked) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_BLOCKED);
        if (admin.isActive) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_ACTIVE);

        // verify identity 
        const identityVerificationMethod = await this.AuthServices.resendIdentifierVerificationCode({
          identity: admin.identity,
        })
        if (identityVerificationMethod.verificationCodeSent) {
          return true

        } else {
          throw new this.ApiError(this.ERROR_MESSAGES.FAILED_TO_SEND_CODE("verification code"))
        }

      } catch (error) {
        throw error;
      }
    })
  };
  /**
   * @signin
   */
  signin = async (payload, requestInfo) => {
    try {

      const admin = await this.Admin.findOne({
        email: payload.email
      });

      if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this account'));

      if (admin.isBlocked) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_BLOCKED);
      if (!admin.isActive) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_DISABLED);

      const response = await this.AuthServices.signin({
        identity: admin.identity,
        password: payload.password,
        actorType: 'admin'
      }, requestInfo)

      return response

    } catch (error) {
      throw error;
    }
  };
  /**
   * @activateMFAToken
   */
  activateMFAToken = async (accessToken, code) => {
    try {
      return await this.AuthServices.activateMFAToken(accessToken, code)
    } catch (error) {
      throw error;
    }
  };
  /**
   * @resendMFACode
   */
  resendMFACode = async (accessToken) => {
    try {
      return await this.AuthServices.resendMFACode(accessToken)
    } catch (error) {
      throw error;
    }
  };
  /**
   * @refreshToken
   */
  refreshToken = async (token, requestInfo) => {
    try {
      return await this.AuthServices.refreshTokens(token, requestInfo)
    } catch (error) {
      throw error;
    }
  };
  /**
   * @generatePasswordResetCode
   */
  generatePasswordResetCode = async (payload) => {
    return this.SessionManager.executeCallbackInTransaction(async (session) => {
      try {

        const admin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          email: payload.email
        }), session);

        if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this account'));

        if (admin.isBlocked) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_BLOCKED);
        if (!admin.isActive) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_DISABLED);

        // verify identity 
        const identityVerificationMethod = await this.AuthServices.sendPasswordResetCode({
          identity: admin.identity,
        })
        if (identityVerificationMethod.resetCodeSent) {

          return true

        } else {
          throw new this.ApiError(this.ERROR_MESSAGES.FAILED_TO_SEND_CODE("password reset code"))
        }

      } catch (error) {
        throw error;

      }
    })
  };
  /**
   * @verifyPasswordResetCode
   */
  verifyPasswordResetCode = async (payload) => {
    return this.SessionManager.executeCallbackInTransaction(async (session) => {
      try {
        const admin = await this.SessionManager.executeQueryHookWithSession(this.Admin.findOne({
          email: payload.email
        }), session);

        if (!admin) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this account'));

        if (admin.isBlocked) throw new this.ApiError(this.ERROR_MESSAGES.ACCOUNT_BLOCKED);

        // verify identity 
        const identityVerificationMethod = await this.AuthServices.verifyPasswordResetCode({
          identity: admin.identity,
          code: payload.code,
        }, session)
        if (identityVerificationMethod.verify) {
          return {
            temporaryToken: identityVerificationMethod.temporaryToken
          }

        } else {
          throw new this.ApiError(this.ERROR_MESSAGES.INVALID_EMAIL_VERIFICATION_CODE)
        }

      } catch (error) {
        throw error;
      }
    })
  };
  /**
   * @resetPassword
   */
  resetPassword = async (token, password) => {
    try {
      const identityVerificationMethod = await this.AuthServices.resetPassword(token, password)
      if (identityVerificationMethod.reset) {
        return {
          reset: true,
          message: this.SUCCESS_MESSAGES.RESET_SUCCESSFULLY("password")
        }

      } else {
        throw new this.ApiError(identityVerificationMethod.error || this.ERROR_MESSAGES.INVALID_TOKEN)
      }

    } catch (error) {
      throw error;
    }
  };
  /**
   * @changePassword
   */
  changePassword = async (payload) => {
    try {
      const identityVerificationMethod = await this.AuthServices.changePassword(payload)
      if (identityVerificationMethod.success) {
        return {
          success: true,
          message: this.SUCCESS_MESSAGES.OPERATION_SUCCESS
        }

      } else {
        throw new this.ApiError(identityVerificationMethod.error || this.ERROR_MESSAGES.FAILED_TO_CHANGE_PASSWORD)
      }

    } catch (error) {
      throw error;
    }
  };
  /**
   * @signout
   */
  signout = async (accessToken) => {
    try {
      return await this.AuthServices.signout(accessToken)
    } catch (error) {
      throw error;
    }
  };
  /**
   * @implementGoogleAuth
   */
  implementGoogleAuth = async (credentials, requestInfo) => {
    try {
      // implement auth
      const response = await this.AuthServices.signinWithGoogle(credentials, "admin", requestInfo)

      if (response.user) {
        // ensure user is created 
        const payload = {
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.identifier,
          identifierType: response.user.identifierType,
        }

        await this.AdminServices.findOrCreate(payload)
      }

      return response
    } catch (error) {
      throw error;
    }
  };
  /**
   * @validateRole 
   */
  validateRole(roles, model, key = "roles") {
    if (roles.length == 0) roles = ['*']
    for (let i = 0; i < roles.length; i++) {
      if (roles[i] == "*") {
        return model;
      } else if (model[key].includes(roles[i])) {
        return model;
      }
    }
    return false
  }
  /**
   * @authorizeAdmin
   */
  async authorizeAdmin(options) {
    try {
      /**
       * @ActorInstance
       */
      let {
        id,
        token,
        roles
      } = options

      if (!id) {
        const authenticateResponse = await this.AuthServices.authenticate(token)
        if (authenticateResponse.success == false) {
          return {
            success: false,
            message: authenticateResponse.message,
            error: authenticateResponse.error
          }
        }
        id = authenticateResponse.data.id
      }

      const admin = await this.Admin.findOne({
        identity: id
      });
      if (!admin)
        return {
          success: false,
          message: this.ERROR_MESSAGES.CAN_NOT_FIND('this admin'),
          error: this.ERROR_CODES.CAN_NOT_FIND
        }

      /**
       * @ValidateRole
       */


      if (!this.validateRole(roles, admin)) {
        return {
          success: false,
          message: this.ERROR_MESSAGES.INVALID_ROLE,
          error: this.ERROR_CODES.INVALID_ROLE
        }
      }

      /**
       * @Action
       */

      if (admin) {
        if (admin.isBlocked) {
          return {
            success: false,
            message: this.ERROR_MESSAGES.ACCOUNT_BLOCKED,
            error: this.ERROR_CODES.ACCOUNT_BLOCKED
          }

        }

        if (!admin.isActive) {
          return {
            success: false,
            message: this.ERROR_MESSAGES.ACCOUNT_DISABLED,
            error: this.ERROR_CODES.ACCOUNT_DISABLED
          }

        }
      }

      return {
        success: true,
        data: admin,
      }


    } catch (error) {
      throw error;
    }
  }

}