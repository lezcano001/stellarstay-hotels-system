import { ServiceModule } from "composed-di";
import { paymentServiceFactory } from "./payment-service.factory";
import { loggerFactory } from "../../common/di/logger.factory";

const paymentModule = ServiceModule.from([
  paymentServiceFactory,
  loggerFactory
])

export {
  paymentModule
}