import { Reservation } from "../../models/reservation.entity";
import { ILogger } from "../common/logger.port";
import { ReservationRepositoryPort } from "../data/reservation.repository";
import { RoomRepositoryPort } from "../data/room.repository";
import { PaymentService } from "../payment/payment.service";
import { PricingService } from "../pricing/pricing.service";

export class ReservationService {
  constructor(
    private logger: ILogger,
    private roomRepo: RoomRepositoryPort,
    private reservationRepo: ReservationRepositoryPort,
    private pricingService: PricingService,
    private paymentService: PaymentService,
  ) {}

  async reserveRoom(params: {
    roomId: string;
    checkIn: Date;
    checkOut: Date;
    breakfastIncluded: boolean;
    guests: number;
    paymentSource: string; // card token
  }): Promise<void> {
    const { roomId, checkIn, checkOut, breakfastIncluded, guests } = params;

    this.logger.info('ReservationService - execute called with:', { roomId, checkIn, checkOut });
    const room = await this.roomRepo.checkIfAvailable(roomId, new Date(checkIn), new Date(checkOut));
    if (!room) {
      throw new Error('Room not available for the given dates');
    }

    const totalCost = await this.pricingService.calculatePrice({
      breakfastIncluded,
      checkIn,
      checkOut,
      guests,
      roomId,
    })

    let tentativeReservation: Reservation
    try {
      tentativeReservation = await this.reservationRepo.reserveTentatively({
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        holdDurationInMinutes: 4, // use a config for this.
        roomId,
        totalCost
      });
    } catch (error) {
      throw new Error('Failed to create a tentative reservation');
    }

    try {
      // Process payment
      const paymentResult = await this.paymentService.charge({
        amount: tentativeReservation.totalCost,
        currency: 'USD',
        source: params.paymentSource,
      })

      if (!paymentResult.success) {
        await this.reservationRepo.cancelReservation(tentativeReservation.id);
        throw new Error('Payment failed, reservation canceled');
      }

      await this.reservationRepo.confirmReservation(tentativeReservation.id);
    } catch (err) {
      await this.reservationRepo.cancelReservation(tentativeReservation.id);
      throw new Error('Payment failed, reservation canceled');
    }
  }

  async getReservations(): Promise<Reservation[]> {
    return this.reservationRepo.getAll()
  }
}