import { ServiceFactory, ServiceKey } from "composed-di";
import { PaymentService } from "../payment.service";
import { LOGGER } from "../../common/di/logger.factory";

const PAYMENT_SERVICE = new ServiceKey<PaymentService>("PaymentService");
const paymentServiceFactory = ServiceFactory.singleton({
  provides: PAYMENT_SERVICE,
  dependsOn: [
    LOGGER
  ],
  initialize: (logger) => new PaymentService(logger),
})

export {
  PAYMENT_SERVICE,
  paymentServiceFactory
}