/**
 * @SectionRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class SectionRoutes extends ParentRoute {

  constructor() {
    super()


    // Controller initialization 
    const sectioncontroller = new(require("../../admin/controllers/section.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Section
     *   description: Section management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Section');

    // Route: Create Section
    swaggerBuilder.addRoute('/api/v1/section', 'post', 'Create a new section', ['Section'])
      .addRequestBody('#/components/schemas/CreateSectionPayload', 'Create Section')
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateSectionResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      this.use(sectioncontroller.create));

    // Route: Get List of Section
    swaggerBuilder.addRoute('/api/v1/section', 'get', 'Get list of section', ['Section'])
      .addQueryParam('perPage', 'string', 'the perPage of section', false)
      .addQueryParam('page', 'string', 'the page of section', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of section', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of section', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of section', false)
      .addQueryParam('Type', 'string', 'the Type of section', false)
      .addResponse(200, 'A list of section', '#/components/schemas/SectionPaginationResponse');

    router.route("/").get(
      this.use(sectioncontroller.findAll));

    // Route: Update Section
    swaggerBuilder.addRoute('/api/v1/section/{id}', 'put', 'Update a section by ID', ['Section'])
      .addPathParam('id', 'string', 'section id', true)
      .addRequestBody('#/components/schemas/UpdateSectionPayload', 'Update Section')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateSectionResponse');

    router.route("/:id").put(
      this.use(sectioncontroller.update));

    // Route: Delete Section by ID
    swaggerBuilder.addRoute('/api/v1/section/{id}', 'delete', 'Delete a section by ID', ['Section'])
      .addPathParam('id', 'string', 'section id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteSectionResponse');

    router.route("/:id").delete(
      this.use(sectioncontroller.delete));

    // Route: Get Section by ID
    swaggerBuilder.addRoute('/api/v1/section/{id}', 'get', 'Get one section by ID', ['Section'])
      .addPathParam('id', 'string', 'section id', true)
      .addResponse(200, 'One Section', '#/components/schemas/FindSectionResponse');

    router.route("/:id").get(
      this.use(sectioncontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.section')


    return router
  }
}