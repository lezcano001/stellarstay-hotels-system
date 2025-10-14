import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomOrmEntity } from "./room.orm-entity";

@Entity('room_types')
export class RoomTypeOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100
  })
  name!: string;

  @Column('decimal')
  baseRate!: number;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @OneToMany(() => RoomOrmEntity, (room) => room.roomType)
  rooms!: RoomOrmEntity[];
}