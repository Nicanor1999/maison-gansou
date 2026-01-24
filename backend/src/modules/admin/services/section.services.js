/**
 * @SectionServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class SectionServices extends CoreServices {

  constructor() {
    super();
    this.Section = require("../../admin/models/section.model");
    this.SectionResources = require("../../admin/resources/section.resources");
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Section.findOne({
        // your condition
        name: payload.name,
      }), session)


    } catch (error) {
      throw error;

    }
  };
  /**
   * @findOrCreate
   */
  findOrCreate = async (payload, session = null) => {
    try {
      const sectionExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (sectionExist) {
        save = sectionExist
      } else {
        save = await this.create(payload, session)
      }

      return save

    } catch (error) {
      reject(error);
    }
  };
  /**
   * @create
   */
  create = async (payload, session = null) => {
    try {
      const options = session ? {
        session
      } : {}

      const schema = {}
      if (this.HelperMethods.issetData(payload.createdBy)) {
        schema.createdBy = this.HelperMethods.getValidTrimData(payload.createdBy);
      }

      if (this.HelperMethods.issetData(payload.updatedBy)) {
        schema.updatedBy = this.HelperMethods.getValidTrimData(payload.updatedBy);
      }

      if (this.HelperMethods.issetData(payload.deletedBy)) {
        schema.deletedBy = this.HelperMethods.getValidTrimData(payload.deletedBy);
      }

      if (this.HelperMethods.issetData(payload.Type)) {
        schema.Type = this.HelperMethods.getValidTrimData(payload.Type);
      }


      const section = new this.Section(schema);
      const save = await section.save(options);

      return save


    } catch (error) {
      throw error;
    }
  };
  /**
   * @update
   */
  update = async (query, payload, session = null) => {
    try {
      const options = session ? {
        session
      } : {
        new: true
      };

      const section = await this.SessionManager.executeQueryHookWithSession(this.Section.findOne(query), session);

      if (!section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this section'))

      const schema = {}
      if (this.HelperMethods.issetData(payload.createdBy)) {
        schema.createdBy = this.HelperMethods.getValidTrimData(payload.createdBy);
      }

      if (this.HelperMethods.issetData(payload.updatedBy)) {
        schema.updatedBy = this.HelperMethods.getValidTrimData(payload.updatedBy);
      }

      if (this.HelperMethods.issetData(payload.deletedBy)) {
        schema.deletedBy = this.HelperMethods.getValidTrimData(payload.deletedBy);
      }

      if (this.HelperMethods.issetData(payload.Type)) {
        schema.Type = this.HelperMethods.getValidTrimData(payload.Type);
      }


      const data = await this.Section.findOneAndUpdate({
          _id: section._id
        },
        schema, options
      );



      return data


    } catch (error) {
      throw error;
    }
  };
  /**
   * @delete
   */
  delete = async (query, session = null) => {
    try {

      const section = await this.SessionManager.executeQueryHookWithSession(this.Section.findOne(query), session);

      if (!section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this section'))

      await section.softDelete(undefined, session);

      return section

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const section = await this.SessionManager.executeQueryHookWithSession(this.Section.findOne({
        _id: id
      }), session)

      if (!section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this section'))

      return await this.SectionResources.ref(section)


    } catch (error) {
      throw error;
    }
  };
  /**
   * @getList
   */
  getList = async (querySchema, match = {}, session = null) => {
    try {
      const {} = match
      const data = []
      const sectionFindData = await this.SessionManager.executeQueryHookWithSession(this.Section.find(querySchema), session)

      for (const item of sectionFindData) {
        if (item) {
          data.push(await this.SectionResources.collection(item))
        }
      }

      return data

    } catch (error) {
      throw error;
    }
  };
  /**
   * @findOne
   */
  findOne = async (querySchema, session = null) => {
    try {
      let data = null

      const sectionFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Section.findOne(querySchema), session)

      if (sectionFindOneData) {
        data = await this.SectionResources.collection(sectionFindOneData)
      }

      return data


    } catch (error) {
      throw error;

    }
  };
  /**
   * @getPaginatedList
   */
  getPaginatedList = async (inputPipeline, options) => {
    try {
      const {
        perPage,
        page,
        route,
        query,
        countDocumentSchema
      } = options

      const servicePipeline = [];
      const paginationResponse = await this.getPaginateAggregateDataService({
        Model: this.Section,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.SectionResources.collection(item))
      );


      return {
        "page": Number(page),
        "totalPages": paginationResponse.totalPages,
        "totalItems": paginationResponse.totalItems,
        "perPage": perPage,
        "nextLink": paginationResponse.nextLink,
        "prevLink": paginationResponse.prevLink,
        "data": data
      }


    } catch (error) {
      throw error;

    }
  };

}