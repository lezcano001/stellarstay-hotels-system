import { RoomType } from "./room-type.entity";

export class Room {
  constructor(
    public readonly id: string,
    public roomNumber: string,
    public description: string,
    public roomType: RoomType,
  ) {}
}