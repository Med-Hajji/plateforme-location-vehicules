import { Router } from "express";
import {
  createVehicule,
  getMesVehicules,
  updateVehicule,
  deleteVehicule,
  getVehiculesPublic,
  getVehiculeById,
  getVehiculesEnAttenteAdmin,
  validerVehiculeAdmin,
  refuserVehiculeAdmin,
} from "../controllers/vehicule.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getVehiculesPublic);
router.get("/agence/mes-vehicules", protect, authorize("AGENCE"), getMesVehicules);
router.get("/admin/en-attente", protect, authorize("ADMIN"), getVehiculesEnAttenteAdmin);
router.get("/:id", getVehiculeById);

router.post("/", protect, authorize("AGENCE"), upload.single("image"), createVehicule);
router.put("/:id", protect, authorize("AGENCE"), updateVehicule);
router.delete("/:id", protect, authorize("AGENCE"), deleteVehicule);
router.patch("/:id/valider", protect, authorize("ADMIN"), validerVehiculeAdmin);
router.patch("/:id/refuser", protect, authorize("ADMIN"), refuserVehiculeAdmin);

export default router;