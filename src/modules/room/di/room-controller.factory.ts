import { ServiceFactory, ServiceKey } from "composed-di";
import { RoomController } from "../room.controller";
import { LOGGER } from "../../common/di/logger.factory";
import { ROOM_SERVICE } from "./room-service.factory";

const ROOM_CONTROLLER = new ServiceKey<RoomController>('RoomController')
const roomControllerFactory = ServiceFactory.singleton({
  provides: ROOM_CONTROLLER,
  dependsOn: [
    LOGGER,
    ROOM_SERVICE,
  ],
  initialize: (
    logger,
    roomService,
  ) => new RoomController(
    logger,
    roomService,
  )
})

export {
  ROOM_CONTROLLER,
  roomControllerFactory
}