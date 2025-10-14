import { ServiceFactory, ServiceKey } from "composed-di";
import { RoomRepositoryPort } from "../room.repository";
import { DATASOURCE } from "../../database/di/data-source.factory";
import { TypeOrmRoomRepository } from '../repositories/typeorm-room.repository'
import { LOGGER } from "../../common/di/logger.factory";

const ROOM_REPOSITORY = new ServiceKey<RoomRepositoryPort>('RoomRepository')
const roomRepositoryFactory = ServiceFactory.singleton({
  provides: ROOM_REPOSITORY,
  dependsOn: [LOGGER, DATASOURCE],
  initialize: (logger, dataSource) => new TypeOrmRoomRepository(logger, dataSource)
})

export {
  ROOM_REPOSITORY,
  roomRepositoryFactory
}