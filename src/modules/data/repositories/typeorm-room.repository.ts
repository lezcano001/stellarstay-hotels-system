import { Room } from '../../../models/room.entity';
import { ILogger } from '../../common/logger.port';
import { RoomOrmEntity } from '../../database/entities/room.orm-entity';
import { RoomMapper } from '../mappers/room.mapper';
import { DataSource } from 'typeorm';
import { RoomRepositoryPort } from '../room.repository';

export class TypeOrmRoomRepository implements RoomRepositoryPort {
  constructor(
    private readonly logger: ILogger,
    private readonly dataSource: DataSource,
  ) {}

  private get repo() {
    return this.dataSource.getRepository(RoomOrmEntity);
  }

  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = this.repo.create(room);

    const savedRoom = await this.repo.save(newRoom);
    
    return RoomMapper.toDomain(savedRoom);
  }

  async findById(id: string): Promise<Room | null> {
    const ormEntity = await this.repo.findOne({ where: { id } });
    if (!ormEntity) return null;

    return RoomMapper.toDomain(ormEntity);
  }

  async findByRoomType(roomTypeId: string): Promise<Room[]> {
    const ormEntities = await this.repo.find({
      where: {
        roomType: {
          id: roomTypeId
        }
      }
    })

    return ormEntities.map(RoomMapper.toDomain);
  }

  async findAll(): Promise<Room[]> {
    const query = this.repo

    const ormEntities = await query.find();

    return ormEntities.map(RoomMapper.toDomain);
  }

  async findAvailable(startDate: Date, endDate: Date): Promise<Room[]> {
    this.logger.debug('Finding available rooms between dates', { startDate, endDate });
    const query = this.repo
      .createQueryBuilder('room')
      .leftJoin('room.reservations', 'reservation', 
        'reservation.checkIn < :endDate AND reservation.checkOut > :startDate', 
        { startDate, endDate }
      )
      .leftJoinAndSelect('room.roomType', 'roomType')
      .where('reservation.id IS NULL'); // means no overlapping reservation

    const ormEntities = await query.getMany();
    return ormEntities.map(RoomMapper.toDomain);
  }

  async checkIfAvailable(roomId: string, startDate: Date, endDate: Date): Promise<boolean> {
    const overlappingReservations = await this.repo
      .createQueryBuilder('room')
      .leftJoin('room.reservations', 'reservation')
      .where('room.id = :roomId', { roomId })
      .andWhere(
        '(reservation.checkIn < :endDate AND reservation.checkOut > :startDate)', // overlap condition
        { startDate, endDate }
      )
      .getCount();
      
    return overlappingReservations === 0;
  }

  async update(id: string, room: Partial<Room>): Promise<Room> {
    await this.repo.update(id, room);
    const updatedRoom = await this.repo.findOne({ where: { id } });
    // Manage this error properly in a real application
    if (!updatedRoom) throw new Error('Room not found');
    return RoomMapper.toDomain(updatedRoom);
  }

  // Add a soft-cascade delete if needed.
  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}