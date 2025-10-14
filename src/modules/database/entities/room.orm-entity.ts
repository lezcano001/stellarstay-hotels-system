import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomTypeOrmEntity } from "./roomType.orm-entity";
import { ReservationORMEntity } from "./reservation.orm-entity";

@Entity('rooms')
export class RoomOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "varchar", unique: true, length: 10 })
  roomNumber!: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => RoomTypeOrmEntity, (roomType) => roomType.rooms, {
    eager: true,
    onDelete: "SET NULL"
  })
  roomType!: RoomTypeOrmEntity;

  @OneToMany(() => ReservationORMEntity, (reservation) => reservation.room, {
    onDelete: "CASCADE"
  })
  reservations!: ReservationORMEntity[];
}