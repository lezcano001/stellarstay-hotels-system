import { ServiceFactory, ServiceKey } from "composed-di";
import { RoomService } from "../room.service";
import { ROOM_REPOSITORY } from "../../data/di/room-repository.factory";
import { LOGGER } from "../../common/di/logger.factory";

const ROOM_SERVICE = new ServiceKey<RoomService>('RoomService')
const roomServiceFactory = ServiceFactory.singleton({
  provides: ROOM_SERVICE,
  dependsOn: [
    LOGGER,
    ROOM_REPOSITORY,
  ],
  initialize: (logger, roomRepo) => new RoomService(logger, roomRepo)
})

export {
  ROOM_SERVICE,
  roomServiceFactory
}