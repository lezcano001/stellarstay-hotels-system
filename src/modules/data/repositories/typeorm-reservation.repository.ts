import { DataSource, MoreThan } from "typeorm";
import { ReservationORMEntity } from "../../database/entities/reservation.orm-entity";
import { ILogger } from "../../common/logger.port";
import { ReservationRepositoryPort } from "../reservation.repository";
import { Reservation } from "../../../models/reservation.entity";
import { ReservationMapper } from "../mappers/reservation.mapper";

export class TypeOrmReservationRepository implements ReservationRepositoryPort {
  constructor(
    private readonly logger: ILogger,
    private readonly dataSource: DataSource,
  ) {}

  private get repo() {
    return this.dataSource.getRepository(ReservationORMEntity);
  }

  async findById(id: string): Promise<Reservation | null> {
    this.logger.debug('Finding reservation by ID', { id });
    const reservation = await this.repo.findOne({ where: { id } });
    return reservation ? ReservationMapper.toDomain(reservation) : null;
  }

  async reserveTentatively({
    checkIn,
    checkOut,
    holdDurationInMinutes,
    roomId,
    totalCost
  }: {
    checkIn: Date,
    checkOut: Date,
    holdDurationInMinutes: number,
    roomId: string,
    totalCost: number
  }): Promise<ReservationORMEntity> {
    const newReservation = this.repo.create({
      checkIn,
      checkOut,
      totalCost,
      room: {
        id: roomId
      },
      status: 'pending',
      holdExpiration: Date.now() + holdDurationInMinutes * 60000, // Convert minutes to milliseconds
    });

    const savedReservation = await this.repo.save(newReservation);

    return savedReservation;
  }

  async confirmReservation(reservationId: string): Promise<ReservationORMEntity> {
    const reservation = await this.repo.findOne({ where: { id: reservationId } });
    if (!reservation) throw new Error('Reservation not found');
    reservation.status = 'confirmed';
    reservation.holdExpiration = null;

    return this.repo.save(reservation);
  }

  async cancelReservation(reservationId: string): Promise<ReservationORMEntity> {
    const reservation = await this.repo.findOne({ where: { id: reservationId } });
    if (!reservation) throw new Error('Reservation not found');
    reservation.status = 'canceled';
    reservation.holdExpiration = null;
    return this.repo.save(reservation);
  }

  async findActiveReservationsForRoom(roomId: string, checkIn: string, checkOut: string): Promise<ReservationORMEntity[]> {
    const reservations = await this.repo.createQueryBuilder("reservation")
      .where("reservation.roomId = :roomId", { roomId })
      .andWhere("reservation.status IN (:...statuses)", { statuses: ['pending', 'confirmed'] })
      .andWhere("NOT (reservation.checkOut <= :checkIn OR reservation.checkIn >= :checkOut)", { checkIn, checkOut })
      .getMany();
      
    return reservations;
  }

  // TODO, this should check all the pending rooms that are not expired.
  async findAllPending(): Promise<Reservation[]> {
    const now = Date.now();

    const ormEntities = await this.repo.find({
      where: {
        status: 'pending',
        holdExpiration: MoreThan(now)
      }
    })

    return ormEntities
  }

  async getAll(): Promise<Reservation[]> {
    const ormEntities = await this.repo.find();
    return ormEntities
  }

  // Add a soft-cascade delete if needed.
  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}