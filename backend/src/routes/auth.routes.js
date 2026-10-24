import { Router } from "express";
import { registerClient, registerAgence, login } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register/client", registerClient);
router.post("/register/agence", registerAgence);
router.post("/login", login);

export default router;