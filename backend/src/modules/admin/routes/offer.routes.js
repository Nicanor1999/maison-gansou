/**
 * @OfferRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class OfferRoutes extends ParentRoute {

  constructor() {
    super()

    // AdminAuthMiddlewares Middleware initialization 
    const adminauthmiddlewares = new(require("../../admin/middlewares/auth.admin.middlewares"))();

    // Controller initialization 
    const offercontroller = new(require("../../admin/controllers/offer.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Offer
     *   description: Offer management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Offer');

    // Route: Create Offer
    swaggerBuilder.addRoute('/api/v1/offer', 'post', 'Create a new offer', ['Offer'])
      .addFormField('Nightly_Price', 'string', 'the Nightly_Price of offer', false)
      .addFileUpload('Pictures', 'Picturesto upload', true)
      .addFormField('Title', 'string', 'the Title of offer', false)
      .addFormField('Bio', 'string', 'the Bio of offer', false)
      .addFormField('Bed_Number', 'string', 'the Bed_Number of offer', false)
      .addFormField('Town', 'string', 'the Town of offer', false)
      .addFormField('Room_Number', 'string', 'the Room_Number of offer', false)
      .addFormField('Availability', 'string', 'the Availability of offer', false)
      .addFormField('Kitchen_Number', 'string', 'the Kitchen_Number of offer', false)
      .addFormField('Parking', 'string', 'the Parking of offer', false)
      .addFormField('Washing_Name', 'string', 'the Washing_Name of offer', false)
      .addFormField('Wifi', 'string', 'the Wifi of offer', false)
      .addFormField('AC', 'string', 'the AC of offer', false)
      .addFormField('Security', 'string', 'the Security of offer', false)
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateOfferResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.upload.defaultUpload(process.env.DEFAULT_UPLOAD || './public/uploads/default/' + 'Pictures', "-Pictures-").array("Pictures"),
      this.use(offercontroller.create));

    // Route: Get List of Offer
    swaggerBuilder.addRoute('/api/v1/offer', 'get', 'Get list of offer', ['Offer'])
      .addQueryParam('perPage', 'string', 'the perPage of offer', false)
      .addQueryParam('page', 'string', 'the page of offer', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of offer', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of offer', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of offer', false)
      .addQueryParam('Nightly_Price', 'number', 'the Nightly_Price of offer', false)
      .addQueryParam('Nightly_PriceLessThan', 'number', 'the Nightly_PriceLessThan of offer', false)
      .addQueryParam('Nightly_PriceLessThanOrEqualTo', 'number', 'the Nightly_PriceLessThanOrEqualTo of offer', false)
      .addQueryParam('Nightly_PriceGreaterThanOrEqualTo', 'number', 'the Nightly_PriceGreaterThanOrEqualTo of offer', false)
      .addQueryParam('Nightly_PriceGreaterThan', 'number', 'the Nightly_PriceGreaterThan of offer', false)
      .addQueryParam('Title', 'string', 'the Title of offer', false)
      .addQueryParam('Bio', 'string', 'the Bio of offer', false)
      .addQueryParam('Bed_Number', 'number', 'the Bed_Number of offer', false)
      .addQueryParam('Bed_NumberLessThan', 'number', 'the Bed_NumberLessThan of offer', false)
      .addQueryParam('Bed_NumberLessThanOrEqualTo', 'number', 'the Bed_NumberLessThanOrEqualTo of offer', false)
      .addQueryParam('Bed_NumberGreaterThanOrEqualTo', 'number', 'the Bed_NumberGreaterThanOrEqualTo of offer', false)
      .addQueryParam('Bed_NumberGreaterThan', 'number', 'the Bed_NumberGreaterThan of offer', false)
      .addQueryParam('Town', 'string', 'the Town of offer', false)
      .addQueryParam('Room_Number', 'number', 'the Room_Number of offer', false)
      .addQueryParam('Room_NumberLessThan', 'number', 'the Room_NumberLessThan of offer', false)
      .addQueryParam('Room_NumberLessThanOrEqualTo', 'number', 'the Room_NumberLessThanOrEqualTo of offer', false)
      .addQueryParam('Room_NumberGreaterThanOrEqualTo', 'number', 'the Room_NumberGreaterThanOrEqualTo of offer', false)
      .addQueryParam('Room_NumberGreaterThan', 'number', 'the Room_NumberGreaterThan of offer', false)
      .addQueryParam('Kitchen_Number', 'number', 'the Kitchen_Number of offer', false)
      .addQueryParam('Kitchen_NumberLessThan', 'number', 'the Kitchen_NumberLessThan of offer', false)
      .addQueryParam('Kitchen_NumberLessThanOrEqualTo', 'number', 'the Kitchen_NumberLessThanOrEqualTo of offer', false)
      .addQueryParam('Kitchen_NumberGreaterThanOrEqualTo', 'number', 'the Kitchen_NumberGreaterThanOrEqualTo of offer', false)
      .addQueryParam('Kitchen_NumberGreaterThan', 'number', 'the Kitchen_NumberGreaterThan of offer', false)
      .addResponse(200, 'A list of offer', '#/components/schemas/OfferPaginationResponse');

    router.route("/").get(
      this.use(offercontroller.findAll));

    // Route: Update Offer
    swaggerBuilder.addRoute('/api/v1/offer/{id}', 'put', 'Update a offer by ID', ['Offer'])
      .addPathParam('id', 'string', 'offer id', true)
      .addFormField('Nightly_Price', 'string', 'the Nightly_Price of offer', false)
      .addFileUpload('Pictures', 'Picturesto upload', true)
      .addFormField('Title', 'string', 'the Title of offer', false)
      .addFormField('Bio', 'string', 'the Bio of offer', false)
      .addFormField('Bed_Number', 'string', 'the Bed_Number of offer', false)
      .addFormField('Town', 'string', 'the Town of offer', false)
      .addFormField('Room_Number', 'string', 'the Room_Number of offer', false)
      .addFormField('Availability', 'string', 'the Availability of offer', false)
      .addFormField('Kitchen_Number', 'string', 'the Kitchen_Number of offer', false)
      .addFormField('Parking', 'string', 'the Parking of offer', false)
      .addFormField('Washing_Name', 'string', 'the Washing_Name of offer', false)
      .addFormField('Wifi', 'string', 'the Wifi of offer', false)
      .addFormField('AC', 'string', 'the AC of offer', false)
      .addFormField('Security', 'string', 'the Security of offer', false)
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateOfferResponse');

    router.route("/:id").put(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.upload.defaultUpload(process.env.DEFAULT_UPLOAD || './public/uploads/default/' + 'Pictures', "-Pictures-").array("Pictures"),
      this.use(offercontroller.update));

    // Route: Delete Offer by ID
    swaggerBuilder.addRoute('/api/v1/offer/{id}', 'delete', 'Delete a offer by ID', ['Offer'])
      .addPathParam('id', 'string', 'offer id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteOfferResponse');

    router.route("/:id").delete(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(offercontroller.delete));

    // Route: Get Offer by ID
    swaggerBuilder.addRoute('/api/v1/offer/{id}', 'get', 'Get one offer by ID', ['Offer'])
      .addPathParam('id', 'string', 'offer id', true)
      .addResponse(200, 'One Offer', '#/components/schemas/FindOfferResponse');

    router.route("/:id").get(
      adminauthmiddlewares.authorizeAdmin('*'),
      this.use(offercontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.offer')


    return router
  }
}