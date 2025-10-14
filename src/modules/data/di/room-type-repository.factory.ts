import { ServiceFactory, ServiceKey } from "composed-di";
import { RoomTypeRepositoryPort } from "../room-type.repository";
import { DATASOURCE } from "../../database/di/data-source.factory";
import { TypeOrmRoomTypeRepository } from "../repositories/typeorm-roomType.repository";

const ROOM_TYPE_REPOSITORY = new ServiceKey<RoomTypeRepositoryPort>('RoomTypeRepository')
const roomTypeRepositoryFactory = ServiceFactory.singleton({
  provides: ROOM_TYPE_REPOSITORY,
  dependsOn: [DATASOURCE],
  initialize: (dataSource) => new TypeOrmRoomTypeRepository(dataSource)
})

export {
  ROOM_TYPE_REPOSITORY,
  roomTypeRepositoryFactory
}