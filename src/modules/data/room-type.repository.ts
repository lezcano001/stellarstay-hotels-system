import { RoomType } from "../../models/room-type.entity";

export interface RoomTypeRepositoryPort {
  create(roomType: RoomType): Promise<RoomType>;
  findById(id: string): Promise<RoomType | null>;
  findAll(): Promise<RoomType[]>;
  update(id: string, data: Partial<RoomType>): Promise<RoomType>;
  delete(id: string): Promise<void>;
}