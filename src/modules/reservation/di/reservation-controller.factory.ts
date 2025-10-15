import { ServiceFactory, ServiceKey } from "composed-di";
import { ReservationController } from "../reservation.controller";
import { LOGGER } from "../../common/di/logger.factory";
import { RESERVATION_SERVICE } from "./reservation-service.factory";

const RESERVATION_CONTROLLER = new ServiceKey<ReservationController>('ReservationController')
const reservationControllerFactory = ServiceFactory.singleton({
  provides: RESERVATION_CONTROLLER,
  dependsOn: [
    LOGGER,
    RESERVATION_SERVICE,
  ],
  initialize: (
    logger,
    reservationService,
  ) => new ReservationController(
    logger,
    reservationService,
  )
})

export {
  RESERVATION_CONTROLLER,
  reservationControllerFactory
}