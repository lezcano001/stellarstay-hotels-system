import { ServiceFactory, ServiceKey } from "composed-di";
import { DataSource } from "typeorm";
import { env } from "../../common/env";
import { RoomOrmEntity } from "../entities/room.orm-entity";
import { RoomTypeOrmEntity } from "../entities/roomType.orm-entity";
import { ReservationORMEntity } from "../entities/reservation.orm-entity";
import { seedDatabase } from "../seed";
import { LOGGER } from "../../common/di/logger.factory";

const DATASOURCE = new ServiceKey<DataSource>('DataSource')
const dataSourceFactory = ServiceFactory.singleton({
  provides: DATASOURCE,
  dependsOn: [LOGGER],
  initialize: async (logger) => {
    const appDataSource = new DataSource({
      type: "postgres",
      host: env.DB_HOST,
      port: env.DB_PORT,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      // TODO: change to glob pattern
      entities: [
        RoomOrmEntity,
        RoomTypeOrmEntity,
        ReservationORMEntity
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: false
    })

    await appDataSource.initialize()

    if (env.NODE_ENV === 'development') {
      await seedDatabase(logger, appDataSource)
    }

    return appDataSource
  }
})

export {
  DATASOURCE,
  dataSourceFactory
}