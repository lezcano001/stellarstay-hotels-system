import { ServiceModule } from "composed-di";
import { roomRepositoryFactory } from "./room-repository.factory";
import { reservationRepositoryFactory } from "./reservation-repository.factory";
import { loggerFactory } from "../../common/di/logger.factory";
import { dataSourceFactory } from "../../database/di/data-source.factory";
import { roomTypeRepositoryFactory } from "./room-type-repository.factory";

const dataModule = ServiceModule.from(
  [
    reservationRepositoryFactory,
    roomRepositoryFactory,
    roomTypeRepositoryFactory,
    dataSourceFactory,
    loggerFactory,
  ]
)

export {
  dataModule
}