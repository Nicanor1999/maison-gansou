/**
 * @ReservationRoutes 
 */


const ParentRoute = require("../../../routes/route.parent")

const SwaggerRouteBuilder = require("../../../shared/lib/swagger/SwaggerRouteBuilder")
module.exports = class ReservationRoutes extends ParentRoute {

  constructor() {
    super()


    // Controller initialization 
    const reservationcontroller = new(require("../../admin/controllers/reservation.controllers"))();

    // Initialize the express router
    const router = this.express.Router();

    /**
     * @swagger
     * tags:
     *   name: Reservation
     *   description: Reservation management 
     */
    const swaggerBuilder = new SwaggerRouteBuilder('Reservation');

    // Route: Create Reservation
    swaggerBuilder.addRoute('/api/v1/reservation', 'post', 'Create a new reservation', ['Reservation'])
      .addRequestBody('#/components/schemas/CreateReservationPayload', 'Create Reservation')
      .addResponse(201, 'Created successfully', '#/components/schemas/CreateReservationResponse')
      .addResponse(400, 'Bad request');

    router.route("/").post(
      this.use(reservationcontroller.create));

    // Route: Get List of Reservation
    swaggerBuilder.addRoute('/api/v1/reservation', 'get', 'Get list of reservation', ['Reservation'])
      .addQueryParam('perPage', 'string', 'the perPage of reservation', false)
      .addQueryParam('page', 'string', 'the page of reservation', false)
      .addQueryParam('createdBy', 'string', 'the createdBy of reservation', false)
      .addQueryParam('updatedBy', 'string', 'the updatedBy of reservation', false)
      .addQueryParam('deletedBy', 'string', 'the deletedBy of reservation', false)
      .addQueryParam('lastNameClient', 'string', 'the lastNameClient of reservation', false)
      .addQueryParam('firstNameClient', 'string', 'the firstNameClient of reservation', false)
      .addQueryParam('email', 'string', 'the email of reservation', false)
      .addQueryParam('country', 'string', 'the country of reservation', false)
      .addQueryParam('phone', 'string', 'the phone of reservation', false)
      .addQueryParam('arrivalDate', 'string', 'the arrivalDate of reservation', false)
      .addQueryParam('startDate', 'string', 'the startDate of reservation', false)
      .addQueryParam('personNumber', 'number', 'the personNumber of reservation', false)
      .addQueryParam('personNumberLessThan', 'number', 'the personNumberLessThan of reservation', false)
      .addQueryParam('personNumberLessThanOrEqualTo', 'number', 'the personNumberLessThanOrEqualTo of reservation', false)
      .addQueryParam('personNumberGreaterThanOrEqualTo', 'number', 'the personNumberGreaterThanOrEqualTo of reservation', false)
      .addQueryParam('personNumberGreaterThan', 'number', 'the personNumberGreaterThan of reservation', false)
      .addQueryParam('clientMessage', 'string', 'the clientMessage of reservation', false)
      .addQueryParam('paymentMode', 'string', 'the paymentMode of reservation', false)
      .addQueryParam('offer', 'string', 'the offer of reservation', false)
      .addResponse(200, 'A list of reservation', '#/components/schemas/ReservationPaginationResponse');

    router.route("/").get(
      this.use(reservationcontroller.findAll));

    // Route: Update Reservation
    swaggerBuilder.addRoute('/api/v1/reservation/{id}', 'put', 'Update a reservation by ID', ['Reservation'])
      .addPathParam('id', 'string', 'reservation id', true)
      .addRequestBody('#/components/schemas/UpdateReservationPayload', 'Update Reservation')
      .addResponse(200, 'Updated successfully', '#/components/schemas/UpdateReservationResponse');

    router.route("/:id").put(
      this.use(reservationcontroller.update));

    // Route: Delete Reservation by ID
    swaggerBuilder.addRoute('/api/v1/reservation/{id}', 'delete', 'Delete a reservation by ID', ['Reservation'])
      .addPathParam('id', 'string', 'reservation id', true)
      .addResponse(200, 'Deleted successfully', '#/components/schemas/DeleteReservationResponse');

    router.route("/:id").delete(
      this.use(reservationcontroller.delete));

    // Route: Get Reservation by ID
    swaggerBuilder.addRoute('/api/v1/reservation/{id}', 'get', 'Get one reservation by ID', ['Reservation'])
      .addPathParam('id', 'string', 'reservation id', true)
      .addResponse(200, 'One Reservation', '#/components/schemas/FindReservationResponse');

    router.route("/:id").get(
      this.use(reservationcontroller.findOne));


    // Save Swagger routes to module spec folder
    swaggerBuilder.saveToModuleSpecFolder('admin', 'crud.reservation')


    return router
  }
}