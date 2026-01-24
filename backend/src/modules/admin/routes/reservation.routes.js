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
      .addQueryParam('Nom_Client', 'string', 'the Nom_Client of reservation', false)
      .addQueryParam('Prenom_Client', 'string', 'the Prenom_Client of reservation', false)
      .addQueryParam('Email', 'string', 'the Email of reservation', false)
      .addQueryParam('Country', 'string', 'the Country of reservation', false)
      .addQueryParam('Phone', 'string', 'the Phone of reservation', false)
      .addQueryParam('Arrival_Date', 'string', 'the Arrival_Date of reservation', false)
      .addQueryParam('Start_Date', 'string', 'the Start_Date of reservation', false)
      .addQueryParam('Person_Number', 'number', 'the Person_Number of reservation', false)
      .addQueryParam('Person_NumberLessThan', 'number', 'the Person_NumberLessThan of reservation', false)
      .addQueryParam('Person_NumberLessThanOrEqualTo', 'number', 'the Person_NumberLessThanOrEqualTo of reservation', false)
      .addQueryParam('Person_NumberGreaterThanOrEqualTo', 'number', 'the Person_NumberGreaterThanOrEqualTo of reservation', false)
      .addQueryParam('Person_NumberGreaterThan', 'number', 'the Person_NumberGreaterThan of reservation', false)
      .addQueryParam('Client_Message', 'string', 'the Client_Message of reservation', false)
      .addQueryParam('Payment_Mode', 'string', 'the Payment_Mode of reservation', false)
      .addQueryParam('Offer', 'string', 'the Offer of reservation', false)
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