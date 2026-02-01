/**
 * @ProjectsRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class ProjectsRoutes extends ParentRoute {

  constructor() {
    super()


    // Controller initialization 
    const projectscontroller = new(require("../../admin/controllers/projects.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Projects
     *   description: Projects management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Projects');

    // Route: Create Projects
    swaggerBuilder.addRoute('/api/v1/projects', 'post', 'Create a new projects', ['Projects'])
      .addRequestBody('#/components/schemas/CreateProjectsPayload', 'Create Projects')
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateProjectsResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      this.upload.defaultUpload(process.env.DEFAULT_UPLOAD || './public/uploads/default/' + 'Pictures', "-Pictures-").array("Pictures"),
      this.use(projectscontroller.create));

    // Route: Get List of Projects
    swaggerBuilder.addRoute('/api/v1/projects', 'get', 'Get list of projects', ['Projects'])
      .addQueryParam('perPage', 'string', 'the perPage of projects', false)
      .addQueryParam('page', 'string', 'the page of projects', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of projects', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of projects', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of projects', false)
      .addQueryParam('title', 'string', 'the title of projects', false)
      .addQueryParam('country', 'string', 'the country of projects', false)
      .addQueryParam('town', 'string', 'the town of projects', false)
      .addQueryParam('services', 'string', 'the services of projects', false)
      .addQueryParam('worksType', 'string', 'the worksType of projects', false)
      .addQueryParam('partners', 'array', 'the partners of projects', false)
      .addQueryParam('section', 'string', 'the section of projects', false)
      .addResponse(200, 'A list of projects', '#/components/schemas/ProjectsPaginationResponse');

    router.route("/").get(
      this.use(projectscontroller.findAll));

    // Route: Update Projects
    swaggerBuilder.addRoute('/api/v1/projects/{id}', 'put', 'Update a projects by ID', ['Projects'])
      .addPathParam('id', 'string', 'projects id', true)
      .addRequestBody('#/components/schemas/UpdateProjectsPayload', 'Update Projects')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateProjectsResponse');

    router.route("/:id").put(
      this.upload.defaultUpload(process.env.DEFAULT_UPLOAD || './public/uploads/default/' + 'Pictures', "-Pictures-").array("Pictures"),
      this.use(projectscontroller.update));

    // Route: Delete Projects by ID
    swaggerBuilder.addRoute('/api/v1/projects/{id}', 'delete', 'Delete a projects by ID', ['Projects'])
      .addPathParam('id', 'string', 'projects id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteProjectsResponse');

    router.route("/:id").delete(
      this.use(projectscontroller.delete));

    // Route: Get Projects by ID
    swaggerBuilder.addRoute('/api/v1/projects/{id}', 'get', 'Get one projects by ID', ['Projects'])
      .addPathParam('id', 'string', 'projects id', true)
      .addResponse(200, 'One Projects', '#/components/schemas/FindProjectsResponse');

    router.route("/:id").get(
      this.use(projectscontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.projects')


    return router
  }
}