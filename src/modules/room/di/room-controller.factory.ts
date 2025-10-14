import { ServiceFactory, ServiceKey } from "composed-di";
import { RoomController } from "../room.controller";
import { LOGGER } from "../../common/di/logger.factory";
import { ROOM_SERVICE } from "./room-service.factory";
import { HTTP_ERRORS } from "../../../errors/di/http-errors.factory";

const ROOM_CONTROLLER = new ServiceKey<RoomController>('RoomController')
const roomControllerFactory = ServiceFactory.singleton({
  provides: ROOM_CONTROLLER,
  dependsOn: [
    LOGGER,
    ROOM_SERVICE,
    HTTP_ERRORS
  ],
  initialize: (
    logger,
    roomService,
    httpErrors
  ) => new RoomController(
    logger,
    roomService,
    httpErrors
  )
})

export {
  ROOM_CONTROLLER,
  roomControllerFactory
}