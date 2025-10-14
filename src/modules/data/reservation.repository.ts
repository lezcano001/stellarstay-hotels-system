import { Reservation } from "../../models/reservation.entity";

export interface ReservationRepositoryPort {
  /** Finds a reservation by its unique ID. */
  findById(id: string): Promise<Reservation | null>;

  /** * Creates a new reservation in a 'pending' status 
   * and sets an expiration time for the hold.
   */
  reserveTentatively({
    checkIn,
    checkOut,
    holdDurationInMinutes,
    roomId,
    totalCost
  }: {
    roomId: string,
    checkIn: Date,
    checkOut: Date,
    totalCost: number,
    holdDurationInMinutes: number
  }): Promise<Reservation>;

  /** Saves a new reservation or updates an existing one (used by the confirmation process). */
  confirmReservation(reservationId: string): Promise<Reservation>;

  /** Saves a new reservation or updates an existing one (used by the confirmation process). */
  cancelReservation(reservationId: string): Promise<Reservation>;

  /** Finds all reservations with a 'pending' status that have not yet expired. */
  findAllPending(): Promise<Reservation[]>; 

  /** Finds all reservations for a specific room. */
  findActiveReservationsForRoom(roomId: string, checkIn: string, checkOut: string): Promise<Reservation[]>;

  /** Retrieves all reservations. */
  getAll(): Promise<Reservation[]>;

  /** Deletes a reservation by its ID. */
  delete(id: string): Promise<void>;
}