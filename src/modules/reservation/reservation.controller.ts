import { Request, Response } from 'express'
import { HttpErrors } from '../../errors/HttpErrors';
import { ILogger } from '../common/logger.port';
import { ReservationService } from './reservation.service';

export class ReservationController {
  constructor(
    private logger: ILogger,
    private reservationService: ReservationService,
    private httpErrors: HttpErrors,
  ) {}

  // TODO - Add the validation of the input parameters (roomId, checkIn, checkOut) to ensure they are present and correctly formatted.
  // TODO - Validate that the checkIn is not higher than the checkOut.
  async reserveRoom(req: Request, res: Response) {
    const { roomId, checkIn, checkOut, breakfastIncluded, guests } = req.body;

    this.logger.debug('ReservationController - reserveRoom called with:', { roomId, checkIn, checkOut });

    if (!roomId || !checkIn || !checkOut) {
      this.logger.error('Missing required parameters:', { roomId, checkIn, checkOut });
      throw this.httpErrors.badRequest('Missing required parameters');
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      throw this.httpErrors.badRequest('Check-out date must be after check-in date');
    }

    try {
      await this.reservationService.reserveRoom({
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        breakfastIncluded,
        guests: guests || 1,
        paymentSource: 'tok_visa', // In a real scenario, this would come from the client (e.g., Stripe.js)
      });

      res.status(200).send('Room reserved successfully');
    } catch (error) {
      this.logger.error('Error reserving room:', { error });
      throw this.httpErrors.badRequest('Error reserving room');
    }
  }

  async getReservations(_req: Request, res: Response) {
    this.logger.debug('ReservationController - getReservations called');
    const reservations = await this.reservationService.getReservations();

    res.status(200).json(reservations);
  }
}