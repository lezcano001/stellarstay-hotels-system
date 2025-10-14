import { ServiceModule } from "composed-di";
import { roomServiceFactory } from "./room-service.factory";
import { roomControllerFactory } from "./room-controller.factory";
import { loggerFactory } from "../../common/di/logger.factory";
import { dataModule } from "../../data/di/data.module";
import { httpErrorsFactory } from "../../../errors/di/http-errors.factory";

const roomModule = ServiceModule.from([
  roomServiceFactory,
  roomControllerFactory,
  loggerFactory,
  dataModule,
  httpErrorsFactory
])

export {
  roomModule
}