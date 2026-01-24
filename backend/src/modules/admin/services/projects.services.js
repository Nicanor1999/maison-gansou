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

      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Country)) {
        schema.Country = this.HelperMethods.getValidTrimData(payload.Country);
      }
      if (this.HelperMethods.issetData(payload.Town)) {
        schema.Town = this.HelperMethods.getValidTrimData(payload.Town);
      }
      if (this.HelperMethods.issetData(payload.Services)) {
        schema.Services = this.HelperMethods.getValidTrimData(payload.Services);
      }
      if (this.HelperMethods.issetData(payload.Works_Type)) {
        schema.Works_Type = this.HelperMethods.getValidTrimData(payload.Works_Type);
      }
      if (this.HelperMethods.issetData(payload.Partners)) {

        schema.Partners = this.HelperMethods.getValidTrimData(payload.Partners);


      }
      if (this.HelperMethods.issetData(payload.Section)) {
        const Section = await this.SharedAdminServices.findSectionById(this.HelperMethods.getValidTrimData(payload.Section), session)
        if (!Section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Section"));

        schema.Section = this.HelperMethods.getValidTrimData(payload.Section);
      }

      if (this.HelperMethods.issetData(payload.Status)) {

        schema.Status = this.HelperMethods.getValidTrimData(payload.Status);


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

      if (this.HelperMethods.issetData(payload.Title)) {
        schema.Title = this.HelperMethods.getValidTrimData(payload.Title);
      }
      if (this.HelperMethods.issetData(payload.Country)) {
        schema.Country = this.HelperMethods.getValidTrimData(payload.Country);
      }
      if (this.HelperMethods.issetData(payload.Town)) {
        schema.Town = this.HelperMethods.getValidTrimData(payload.Town);
      }
      if (this.HelperMethods.issetData(payload.Services)) {
        schema.Services = this.HelperMethods.getValidTrimData(payload.Services);
      }
      if (this.HelperMethods.issetData(payload.Works_Type)) {
        schema.Works_Type = this.HelperMethods.getValidTrimData(payload.Works_Type);
      }
      if (this.HelperMethods.issetData(payload.Partners)) {

        schema.Partners = this.HelperMethods.getValidTrimData(payload.Partners);


      }
      if (this.HelperMethods.issetData(payload.Section)) {
        const Section = await this.SharedAdminServices.findSectionById(this.HelperMethods.getValidTrimData(payload.Section), session)
        if (!Section) throw new this.NotFoundError(this.ERROR_MESSAGES.CAN_NOT_FIND("this Section"));

        schema.Section = this.HelperMethods.getValidTrimData(payload.Section);
      }

      if (this.HelperMethods.issetData(payload.Status)) {

        schema.Status = this.HelperMethods.getValidTrimData(payload.Status);


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
  getList = async (querySchema, match = {
    matchSection: {}
  }, session = null) => {
    try {
      const {
        matchSection,
      } = match
      const data = []
      const projectsFindData = await this.SessionManager.executeQueryHookWithSession(this.Projects.find(querySchema).populate({
        path: "Section",
        match: matchSection
      }), session)

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

      const projectsFindOneData = await this.SessionManager.executeQueryHookWithSession(this.Projects.findOne(querySchema).populate({
        path: "Section",
      }), session)

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

      const servicePipeline = [{
          $lookup: {
            from: "sections",
            localField: "Section",
            foreignField: "_id",
            as: "Section"
          }
        },

        {
          $addFields: {
            Section: {
              $ifNull: [{
                $arrayElemAt: ['$Section', 0]
              }, null]
            }
          }
        },
        {
          $unwind: {
            path: '$Section',
            preserveNullAndEmptyArrays: true
          }
        },

      ];
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