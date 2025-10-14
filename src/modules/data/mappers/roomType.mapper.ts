import { RoomType } from "../../../models/room-type.entity";
import { RoomTypeOrmEntity } from "../../database/entities/roomType.orm-entity";

export class RoomTypeMapper {
  static toDomain(orm: RoomTypeOrmEntity): RoomType {
    return new RoomType(
      orm.id,
      orm.name,
      orm.baseRate,
      orm.description
    );
  }

  static toOrm(domain: RoomType): RoomTypeOrmEntity {
    const orm = new RoomTypeOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.baseRate = domain.baseRate;
    orm.description = domain.description;

    return orm;
  }
}