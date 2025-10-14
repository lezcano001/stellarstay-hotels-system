import { Room } from "../../models/room.entity";

export interface RoomRepositoryPort {
  create(room: any): Promise<Room>;
  findById(id: string): Promise<Room | null>;
  findByRoomType(roomTypeId: string): Promise<Room[]>;
  findAll(): Promise<Room[]>;
  findAvailable(startData: Date, endDate: Date): Promise<Room[]>;
  checkIfAvailable(roomId: string, startDate: Date, endDate: Date): Promise<boolean>;
  update(id: string, room: Partial<Room>): Promise<Room>;
  delete(id: string): Promise<void>;
}