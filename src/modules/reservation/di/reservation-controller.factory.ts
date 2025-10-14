import { ServiceFactory, ServiceKey } from "composed-di";
import { ReservationController } from "../reservation.controller";
import { LOGGER } from "../../common/di/logger.factory";
import { RESERVATION_SERVICE } from "./reservation-service.factory";
import { HTTP_ERRORS } from "../../../errors/di/http-errors.factory";

const RESERVATION_CONTROLLER = new ServiceKey<ReservationController>('ReservationController')
const reservationControllerFactory = ServiceFactory.singleton({
  provides: RESERVATION_CONTROLLER,
  dependsOn: [
    LOGGER,
    RESERVATION_SERVICE,
    HTTP_ERRORS
  ],
  initialize: (
    logger,
    reservationService,
    httpErrors
  ) => new ReservationController(
    logger,
    reservationService,
    httpErrors
  )
})

export {
  RESERVATION_CONTROLLER,
  reservationControllerFactory
}