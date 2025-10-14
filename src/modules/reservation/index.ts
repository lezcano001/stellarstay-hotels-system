import { Router } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";
import { ReservationController } from "./reservation.controller";

const getReservationRoutes = (reservationController: ReservationController): Router => {
  const router = Router();

  router.post("/", asyncHandler((req, res) => reservationController.reserveRoom(req, res)));
  router.get("/", asyncHandler((req, res) => reservationController.getReservations(req, res)));

  return router;
}

export {
  getReservationRoutes
}