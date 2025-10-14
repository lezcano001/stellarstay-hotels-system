import type { Request, Response } from 'express'
import { RoomService } from './room.service';
import { ILogger } from '../common/logger.port';
import { HttpErrors } from '../../errors/HttpErrors';

export class RoomController {
  constructor(
    private logger: ILogger,
    private roomService: RoomService,
    private httpErrors: HttpErrors
  ) {}

  async createRoom(req: Request, res: Response) {
    const { name, description, direction, roomTypeId } = req.body
    const room = await this.roomService.createRoom({
      direction,
      name,
      roomTypeId,
      description
    });

    return res.status(201).json(room);
  }

  async listRooms(_: Request, res: Response) {
    const rooms = await this.roomService.listRooms();
    return res.status(200).json(rooms);
  }

  // TODO - Validate that the checkIn is not higher than the checkOut.
  // Validate the input parameters (checkIn and checkOut) to ensure they are present and correctly formatted.
  // Call the GetAvailableRoomsUseCase with the validated parameters to retrieve available rooms.
  // Handle potential errors and return appropriate HTTP status codes and messages.
  async getAvailable(req: Request, res: Response) {
    const { checkIn, checkOut } = req.query;

    // Validate the format of the checkIn and checkOut parameters, which should use a Date in the format we admit.
    if (typeof checkIn !== 'string' || typeof checkOut !== 'string') {
      this.logger.error('Invalid query parameters', { checkIn, checkOut });
      throw this.httpErrors.badRequest('Invalid query parameters');
    }

    const availableRooms = await this.roomService.getAvailableRooms({
      checkIn,
      checkOut
    });

    return res.status(200).json(availableRooms);
  }
}