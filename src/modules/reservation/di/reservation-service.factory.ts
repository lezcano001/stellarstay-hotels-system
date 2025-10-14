import { ServiceFactory, ServiceKey } from "composed-di";
import { ReservationService } from "../reservation.service";
import { LOGGER } from "../../common/di/logger.factory";
import { ROOM_REPOSITORY } from "../../data/di/room-repository.factory";
import { RESERVATION_REPOSITORY } from "../../data/di/reservation-repository.factory";
import { PRICING_SERVICE } from "../../pricing/di/pricing-service.factory";
import { PAYMENT_SERVICE } from "../../payment/di/payment-service.factory";

const RESERVATION_SERVICE = new ServiceKey<ReservationService>('ReservationService')
const reservationServiceFactory = ServiceFactory.singleton({
  provides: RESERVATION_SERVICE,
  dependsOn: [
    LOGGER,
    ROOM_REPOSITORY,
    RESERVATION_REPOSITORY,
    PRICING_SERVICE,
    PAYMENT_SERVICE
  ],
  initialize: (logger, roomRepo, reservationRepo, pricingService, paymentService) => {
    return new ReservationService(logger, roomRepo, reservationRepo, pricingService, paymentService)
  }
})

export {
  RESERVATION_SERVICE,
  reservationServiceFactory
}