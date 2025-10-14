import { Room } from "../../models/room.entity";
import { ILogger } from "../common/logger.port";
import { RoomRepositoryPort } from "../data/room.repository";

export class RoomService {
  constructor(
    private logger: ILogger,
    private roomRepo: RoomRepositoryPort,
  ) {}

  async listRooms() {
    const rooms = await this.roomRepo.findAll();
    return rooms;
  }

  async createRoom(input: {
    roomTypeId: string;
    name: string;
    description?: string;
    direction: string,
  }): Promise<Room> {
    const { name, roomTypeId, description = "", direction } = input

    const id = "room_" + Date.now();

    const room = await this.roomRepo.create({
      id,
      roomTypeId: roomTypeId,
      roomNumber: name,
      description,
      direction,
    });

    return room;
  }

  async getAvailableRooms(params: { checkIn: string; checkOut: string }): Promise<Room[]> {
    const { checkIn, checkOut } = params;
    this.logger.debug(
      'CheckIn and CheckOut received',
      {
        checkIn,
        checkOut,
        formattedCheckIn: new Date(checkIn),
        formattedCheckOut: new Date(checkOut)
      }
    );
    
    const rooms = await this.roomRepo.findAvailable(new Date(checkIn), new Date(checkOut));
    return rooms;
  }
}