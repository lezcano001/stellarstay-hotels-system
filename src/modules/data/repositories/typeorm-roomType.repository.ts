import { DataSource } from "typeorm";
import { RoomTypeMapper } from "../mappers/roomType.mapper";
import { RoomTypeOrmEntity } from "../../database/entities/roomType.orm-entity";
import { RoomType } from "../../../models/room-type.entity";
import { RoomTypeRepositoryPort } from "../room-type.repository";

export class TypeOrmRoomTypeRepository implements RoomTypeRepositoryPort {
  constructor(private readonly dataSource: DataSource) {}

  private get repo() {
    return this.dataSource.getRepository(RoomTypeOrmEntity);
  }

  async findById(id: string): Promise<RoomType | null> {
    const ormEntity = await this.repo.findOne({ where: { id } });
    if (!ormEntity) return null;
    
    return RoomTypeMapper.toDomain(ormEntity);
  }

  async findAll(): Promise<RoomType[]> {
    const ormEntities = await this.repo.find();

    return ormEntities.map(RoomTypeMapper.toDomain);
  }

  async create(roomType: RoomType): Promise<RoomType> {
    const newRoomType = this.repo.create(roomType);

    const savedRoomType = await this.repo.save(newRoomType);
    
    return RoomTypeMapper.toDomain(savedRoomType);
  }

  async update(id: string, data: Partial<RoomType>): Promise<RoomType> {
    await this.repo.update(id, data);

    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new Error('Room type not found');
    
    return RoomTypeMapper.toDomain(updated);
  }

  // Add a soft-cascade delete if needed.
  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}