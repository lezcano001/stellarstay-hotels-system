import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomOrmEntity } from "./room.orm-entity";
import { Reservation, ReservationStatus } from "../../../models/reservation.entity";

@Entity('reservations')
export class ReservationORMEntity implements Reservation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => RoomOrmEntity, {
    eager: true,
    onDelete: 'CASCADE',
  })
  room!: RoomOrmEntity;

  @Column({ type: "date" })
  checkIn!: Date;

  @Column({ type: "date" })
  checkOut!: Date;
  
  @Column({
    type: "varchar",
  })
  status!: ReservationStatus;

  @Column({ type: 'float' })
  totalCost!: number;

  @Column({ type: "bigint", nullable: true })
  holdExpiration: number | null;
}