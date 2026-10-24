import { Router } from "express";
import { getAgencesEnAttenteAdmin, validerAgence, suspendreAgence } from "../controllers/agence.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/admin/en-attente", protect, authorize("ADMIN"), getAgencesEnAttenteAdmin);
router.patch("/:id/valider", protect, authorize("ADMIN"), validerAgence);
router.patch("/:id/suspendre", protect, authorize("ADMIN"), suspendreAgence);

export default router;