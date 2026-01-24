/**
 * @TagsRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class TagsRoutes extends ParentRoute {

  constructor() {
    super()

    // AdminAuthMiddlewares Middleware initialization 
    const adminauthmiddlewares = new(require("../../admin/middlewares/auth.admin.middlewares"))();

    // Controller initialization 
    const tagscontroller = new(require("../../admin/controllers/tags.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Tags
     *   description: Tags management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Tags');

    // Route: Create Tags
    swaggerBuilder.addRoute('/api/v1/tags', 'post', 'Create a new tags', ['Tags'])
      .addRequestBody('#/components/schemas/CreateTagsPayload', 'Create Tags')
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateTagsResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(tagscontroller.create));

    // Route: Get List of Tags
    swaggerBuilder.addRoute('/api/v1/tags', 'get', 'Get list of tags', ['Tags'])
      .addQueryParam('perPage', 'string', 'the perPage of tags', false)
      .addQueryParam('page', 'string', 'the page of tags', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of tags', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of tags', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of tags', false)
      .addQueryParam('Tags', 'string', 'the Tags of tags', false)
      .addResponse(200, 'A list of tags', '#/components/schemas/TagsPaginationResponse');

    router.route("/").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(tagscontroller.findAll));

    // Route: Update Tags
    swaggerBuilder.addRoute('/api/v1/tags/{id}', 'put', 'Update a tags by ID', ['Tags'])
      .addPathParam('id', 'string', 'tags id', true)
      .addRequestBody('#/components/schemas/UpdateTagsPayload', 'Update Tags')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateTagsResponse');

    router.route("/:id").put(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(tagscontroller.update));

    // Route: Delete Tags by ID
    swaggerBuilder.addRoute('/api/v1/tags/{id}', 'delete', 'Delete a tags by ID', ['Tags'])
      .addPathParam('id', 'string', 'tags id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteTagsResponse');

    router.route("/:id").delete(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(tagscontroller.delete));

    // Route: Get Tags by ID
    swaggerBuilder.addRoute('/api/v1/tags/{id}', 'get', 'Get one tags by ID', ['Tags'])
      .addPathParam('id', 'string', 'tags id', true)
      .addResponse(200, 'One Tags', '#/components/schemas/FindTagsResponse');

    router.route("/:id").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(tagscontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.tags')


    return router
  }
}