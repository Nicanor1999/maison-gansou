/**
 * @ProjectsServices 
 */

const CoreServices = require("../../../shared/services/core.services")
module.exports = class ProjectsServices extends CoreServices {

  constructor() {
    super();
    this.Projects = require("../../admin/models/projects.model");
    this.ProjectsResources = require("../../admin/resources/projects.resources");
    this.SharedAdminServices = new(require("../../admin/services/shared.admin.services"))();
  }
  /**
   * @instanceAlreadyExist
   */
  instanceAlreadyExist = async (payload, session = null) => {
    try {
      return await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne({
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
      const projectsExist = await this.instanceAlreadyExist(payload, session)

      let save
      if (projectsExist) {
        save = projectsExist
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

      // Assign project fields directly - empty strings are valid for text fields
      if (payload.title !== undefined) {
        schema.title = typeof payload.title === 'string' ? payload.title.trim() : payload.title;
      }
      if (payload.country !== undefined) {
        schema.country = typeof payload.country === 'string' ? payload.country.trim() : payload.country;
      }
      if (payload.town !== undefined) {
        schema.town = typeof payload.town === 'string' ? payload.town.trim() : payload.town;
      }
      if (payload.services !== undefined) {
        schema.services = typeof payload.services === 'string' ? payload.services.trim() : payload.services;
      }
      if (payload.worksType !== undefined) {
        schema.worksType = typeof payload.worksType === 'string' ? payload.worksType.trim() : payload.worksType;
      }
      if (payload.partners !== undefined) {
        schema.partners = payload.partners;
      }
      if (payload.sections && Array.isArray(payload.sections)) {
        schema.sections = payload.sections;
      }
      if (payload.projectType !== undefined) {
        schema.projectType = typeof payload.projectType === 'string' ? payload.projectType.trim() : payload.projectType;
      }
      if (payload.status !== undefined) {
        schema.status = payload.status;
      }


      const projects = new this.Projects(schema);
      const save = await projects.save(options);

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

      const projects = await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne(query), session);

      if (!projects) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this projects'))

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

      if (payload.title !== undefined) {
        schema.title = typeof payload.title === 'string' ? payload.title.trim() : payload.title;
      }
      if (payload.country !== undefined) {
        schema.country = typeof payload.country === 'string' ? payload.country.trim() : payload.country;
      }
      if (payload.town !== undefined) {
        schema.town = typeof payload.town === 'string' ? payload.town.trim() : payload.town;
      }
      if (payload.services !== undefined) {
        schema.services = typeof payload.services === 'string' ? payload.services.trim() : payload.services;
      }
      if (payload.worksType !== undefined) {
        schema.worksType = typeof payload.worksType === 'string' ? payload.worksType.trim() : payload.worksType;
      }
      if (payload.partners !== undefined) {
        schema.partners = payload.partners;
      }
      if (payload.sections && Array.isArray(payload.sections)) {
        schema.sections = payload.sections;
      }
      if (payload.projectType !== undefined) {
        schema.projectType = typeof payload.projectType === 'string' ? payload.projectType.trim() : payload.projectType;
      }
      if (payload.status !== undefined) {
        schema.status = payload.status;
      }


      const data = await this.Projects.findOneAndUpdate({
          _id: projects._id
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

      const projects = await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne(query), session);

      if (!projects) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this projects'))

      await projects.softDelete(undefined, session);

      return projects

    } catch (error) {
      throw error;

    }
  };
  /**
   * @findById
   */
  findById = async (id, session = null) => {
    try {
      const projects = await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne({
        _id: id
      }), session)

      if (!projects) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND('this projects'))

      return await this.ProjectsResources.ref(projects)


    } catch (error) {
      throw error;
    }
  };
  /**
   * @getList
   */
  getList = async (querySchema, match = {}, session = null) => {
    try {
      const data = []
      const projectsFindData = await this.SessionManager.executeQueryHookWithSession(this.Projects.find(querySchema), session)

      for (const item of projectsFindData) {
        if (item
          //&&item.Section
        ) {
          data.push(await this.ProjectsResources.collection(item))
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

      const projectsFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne(querySchema), session)

      if (projectsFindOneData) {
        data = await this.ProjectsResources.collection(projectsFindOneData)
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
        Model: this.Projects,
        perPage: perPage,
        page: page,
        query: query,
        route: route,
        pipeline: servicePipeline.concat(inputPipeline),
        countDocumentSchema: countDocumentSchema

      })

      const response = paginationResponse.data

      const data = await Promise.all(
        response.map(item => this.ProjectsResources.collection(item))
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