import { RoomRepositoryPort } from "../data/room.repository";

interface PricingInput {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  breakfastIncluded: boolean;
}

export class PricingService {
  constructor(
    private roomRepo: RoomRepositoryPort,
  ) {}

  async calculatePrice(input: PricingInput): Promise<number> {
    const { roomId, checkIn, checkOut, guests, breakfastIncluded } = input;

    const room = await this.roomRepo.findById(roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    let total = 0;
    const oneDay = 24 * 60 * 60 * 1000;
    const nights = Math.floor((checkOut.getTime() - checkIn.getTime()) / oneDay);

    for (let i = 0; i < nights; i++) {
      const date = new Date(checkIn.getTime() + i * oneDay);
      let dayRate = room.roomType.baseRate;

      if (date.getDay() === 0 || date.getDay() === 6) { // Sunday=0, Saturday=6
        dayRate *= 1.25;
      }

      total += dayRate;
    }

    // Length-of-stay discount
    if (nights >= 4 && nights <= 6) {
      total -= 4 * nights;
    } else if (nights >= 7 && nights <= 9) {
      total -= 8 * nights;
    } else if (nights >= 10) {
      total -= 12 * nights;
    }

    // Guests surcharge
    total = guests * total

    // Breakfast
    if (breakfastIncluded) {
      total += 5 * guests * nights;
    }

    return total;
  }
}
