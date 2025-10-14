import { Room } from "../../../models/room.entity";
import { RoomOrmEntity } from "../../database/entities/room.orm-entity";
import { RoomTypeOrmEntity } from "../../database/entities/roomType.orm-entity";
import { RoomTypeMapper } from "./roomType.mapper";

export class RoomMapper {
  static toDomain(orm: RoomOrmEntity): Room {
    const roomType = RoomTypeMapper.toDomain(orm.roomType);
    return new Room(orm.id, orm.roomNumber, orm.description, roomType);
  }

  static toOrm(room: Room): RoomOrmEntity {
    const orm = new RoomOrmEntity();
    orm.id = room.id;
    orm.roomNumber = room.roomNumber;
    orm.description = room.description;

    orm.roomType = new RoomTypeOrmEntity();
    orm.roomType.id = room.roomType.id;
    
    return orm;
  }
}