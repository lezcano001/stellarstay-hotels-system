import { printDotGraph, ServiceModule } from "composed-di"
import { roomModule } from "./modules/room/di/room.module"
import { ROOM_CONTROLLER } from "./modules/room/di/room-controller.factory"
import { getRoomRoutes } from "./modules/room"
import express from 'express'
import { env } from "./modules/common/env"
import { LOGGER } from "./modules/common/di/logger.factory"
import { setupSwagger } from "./config/swagger"
import { createErrorMiddleware } from "./middlewares/error.middleware"
import { reservationModule } from "./modules/reservation/di/reservation.module"
import { RESERVATION_CONTROLLER } from "./modules/reservation/di/reservation-controller.factory"
import { getReservationRoutes } from "./modules/reservation"

const appModule = ServiceModule.from([
  roomModule,
  reservationModule
])

printDotGraph(appModule)

const boostrap = async () => {
  const logger = await appModule.get(LOGGER)
  const roomController = await appModule.get(ROOM_CONTROLLER)
  const reservationController = await appModule.get(RESERVATION_CONTROLLER)
  
  const app = express()

  app.use(express.json())

  // Swagger
  setupSwagger(app)

  // Dependencies
  app.use("/api/rooms", getRoomRoutes(roomController))
  app.use("/api/reservations", getReservationRoutes(reservationController))

  // Middlewares
  app.use(createErrorMiddleware(logger))

  app.listen(env.APP_PORT, () => {
    logger.info(`Server running on port ${env.APP_PORT}`)
    logger.info(`Swagger docs available at http://localhost:${env.APP_PORT}/api/docs`)
  })
}

boostrap()