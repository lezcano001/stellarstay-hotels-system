import { ServiceModule } from "composed-di";
import { dataModule } from "../../data/di/data.module";
import { pricingServiceFactory } from "./pricing-service.factory";

const pricingModule = ServiceModule.from([
  dataModule,
  pricingServiceFactory
])

export {
  pricingModule
}