import { Router } from "express";
import {
  createReservation,
  getMesReservationsClient,
  getMesReservationsAgence,
  repondreReservation,
  getAllReservationsAdmin,
} from "../controllers/reservation.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", protect, authorize("CLIENT"), createReservation);
router.get("/client/mes-reservations", protect, authorize("CLIENT"), getMesReservationsClient);
router.get("/agence/mes-reservations", protect, authorize("AGENCE"), getMesReservationsAgence);
router.get("/admin/toutes", protect, authorize("ADMIN"), getAllReservationsAdmin);
router.patch("/:id/repondre", protect, authorize("AGENCE"), repondreReservation);

export default router;