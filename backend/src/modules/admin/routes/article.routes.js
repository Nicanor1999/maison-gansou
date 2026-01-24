/**
 * @ArticleRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class ArticleRoutes extends ParentRoute {

  constructor() {
    super()

    // AdminAuthMiddlewares Middleware initialization 
    const adminauthmiddlewares = new(require("../../admin/middlewares/auth.admin.middlewares"))();

    // Controller initialization 
    const articlecontroller = new(require("../../admin/controllers/article.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Article
     *   description: Article management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Article');

    // Route: Create Article
    swaggerBuilder.addRoute('/api/v1/article', 'post', 'Create a new article', ['Article'])
      .addRequestBody('#/components/schemas/CreateArticlePayload', 'Create Article')
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateArticleResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(articlecontroller.create));

    // Route: Get List of Article
    swaggerBuilder.addRoute('/api/v1/article', 'get', 'Get list of article', ['Article'])
      .addQueryParam('perPage', 'string', 'the perPage of article', false)
      .addQueryParam('page', 'string', 'the page of article', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of article', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of article', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of article', false)
      .addQueryParam('Tags', 'string', 'the Tags of article', false)
      .addQueryParam('Title', 'string', 'the Title of article', false)
      .addQueryParam('Section', 'string', 'the Section of article', false)
      .addResponse(200, 'A list of article', '#/components/schemas/ArticlePaginationResponse');

    router.route("/").get(
      this.use(articlecontroller.findAll));

    // Route: Update Article
    swaggerBuilder.addRoute('/api/v1/article/{id}', 'put', 'Update a article by ID', ['Article'])
      .addPathParam('id', 'string', 'article id', true)
      .addRequestBody('#/components/schemas/UpdateArticlePayload', 'Update Article')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateArticleResponse');

    router.route("/:id").put(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(articlecontroller.update));

    // Route: Delete Article by ID
    swaggerBuilder.addRoute('/api/v1/article/{id}', 'delete', 'Delete a article by ID', ['Article'])
      .addPathParam('id', 'string', 'article id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteArticleResponse');

    router.route("/:id").delete(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(articlecontroller.delete));

    // Route: Get Article by ID
    swaggerBuilder.addRoute('/api/v1/article/{id}', 'get', 'Get one article by ID', ['Article'])
      .addPathParam('id', 'string', 'article id', true)
      .addResponse(200, 'One Article', '#/components/schemas/FindArticleResponse');

    router.route("/:id").get(
      this.use(articlecontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.article')


    return router
  }
}