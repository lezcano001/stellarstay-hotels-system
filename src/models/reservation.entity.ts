import { Room } from "./room.entity";

export type ReservationStatus = 'pending' | 'confirmed' | 'canceled' | 'completed';

export class Reservation {
  constructor(
    public id: string,
    public room: Room,
    public checkIn: Date,
    public checkOut: Date,
    public status: ReservationStatus,
    public totalCost: number,
    public holdExpiration: number | null,
  ) {}
}