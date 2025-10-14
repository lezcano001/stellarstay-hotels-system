import { Reservation } from "../../../models/reservation.entity";
import { ReservationORMEntity } from "../../database/entities/reservation.orm-entity";
import { RoomMapper } from "./room.mapper";

export class ReservationMapper {
  static toDomain(orm: ReservationORMEntity): Reservation {
    const room = RoomMapper.toDomain(orm.room);
    const holdExpiration = orm.holdExpiration ? Number(orm.holdExpiration) : null;

    const reservation = new Reservation(
      orm.id,
      room,
      orm.checkIn,
      orm.checkOut,
      orm.status,
      orm.totalCost,
      holdExpiration
    );

    return reservation;
  }

  static toOrm(reservation: Reservation): ReservationORMEntity {
    const orm = new ReservationORMEntity();
    orm.id = reservation.id;
    orm.room = RoomMapper.toOrm(reservation.room);
    orm.checkIn = reservation.checkIn;
    orm.checkOut = reservation.checkOut;
    orm.status = reservation.status;
    orm.holdExpiration = reservation.holdExpiration ? Number(reservation.holdExpiration) : null;
    
    return orm;
  }
}