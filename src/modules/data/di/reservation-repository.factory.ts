import { ServiceFactory, ServiceKey } from "composed-di";
import { ReservationRepositoryPort } from "../reservation.repository";
import { DATASOURCE } from "../../database/di/data-source.factory";
import { LOGGER } from "../../common/di/logger.factory";
import { TypeOrmReservationRepository } from "../repositories/typeorm-reservation.repository";

const RESERVATION_REPOSITORY = new ServiceKey<ReservationRepositoryPort>('ReservationRepository')
const reservationRepositoryFactory = ServiceFactory.singleton({
  provides: RESERVATION_REPOSITORY,
  dependsOn: [LOGGER, DATASOURCE],
  initialize: (logger, dataSource) => new TypeOrmReservationRepository(logger, dataSource)
})

export {
  RESERVATION_REPOSITORY,
  reservationRepositoryFactory,
}