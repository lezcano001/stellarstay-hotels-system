import { ServiceFactory, ServiceKey } from "composed-di";
import { PricingService } from "../pricing.service";
import { ROOM_REPOSITORY } from "../../data/di/room-repository.factory";

const PRICING_SERVICE = new ServiceKey<PricingService>('PricingService')
const pricingServiceFactory = ServiceFactory.singleton({
  provides: PRICING_SERVICE,
  dependsOn: [ROOM_REPOSITORY],
  initialize: (roomRepo) => new PricingService(roomRepo)
})

export {
  PRICING_SERVICE,
  pricingServiceFactory
}