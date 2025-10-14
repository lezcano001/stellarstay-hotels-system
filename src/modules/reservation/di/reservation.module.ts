import { ServiceModule } from "composed-di";
import { reservationServiceFactory } from "./reservation-service.factory";
import { reservationControllerFactory } from "./reservation-controller.factory";
import { loggerFactory } from "../../common/di/logger.factory";
import { dataModule } from "../../data/di/data.module";
import { pricingModule } from "../../pricing/di/pricing.module";
import { paymentModule } from "../../payment/di/payment.module";
import { httpErrorsFactory } from "../../../errors/di/http-errors.factory";

const reservationModule = ServiceModule.from([
  reservationServiceFactory,
  reservationControllerFactory,
  loggerFactory,
  dataModule,
  pricingModule,
  paymentModule,
  httpErrorsFactory
])

export {
  reservationModule
}