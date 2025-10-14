import { ServiceModule } from "composed-di";
import { roomServiceFactory } from "./room-service.factory";
import { roomControllerFactory } from "./room-controller.factory";
import { loggerFactory } from "../../common/di/logger.factory";
import { dataModule } from "../../data/di/data.module";

const roomModule = ServiceModule.from([
  roomServiceFactory,
  roomControllerFactory,
  loggerFactory,
  dataModule,
])

export {
  roomModule
}