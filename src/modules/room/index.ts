import { Router } from "express";
import { RoomController } from "./room.controller";
import { asyncHandler } from "../../middlewares/asyncHandler.middleware";

const getRoomRoutes = (roomController: RoomController): Router => {
  const router = Router();

  router.post("/", asyncHandler((req, res) => roomController.createRoom(req, res)));
  router.get("/", asyncHandler((req, res) => roomController.listRooms(req, res)));
  router.get("/available", asyncHandler((req, res) => roomController.getAvailable(req, res)));

  return router;
}

export {
  getRoomRoutes
}