/**
 * @Section 
 */
const CoreServices = require("../../../shared/services/core.services")
module.exports = class SectionMiddlewares {

  constructor() {
    this.SectionServices = new(require("../../admin/services/section.services"))();

    const service = new CoreServices()
    this.STATUS_CODES = service.STATUS_CODES
    this.ERROR_MESSAGES = service.ERROR_MESSAGES
    this.ERROR_CODES = service.ERROR_CODES
    this.SUCCESS_MESSAGES = service.SUCCESS_MESSAGES
    this.TIME_SETTINGS = service.TIME_SETTINGS
    this.asyncHandler = service.asyncHandler
  }
}