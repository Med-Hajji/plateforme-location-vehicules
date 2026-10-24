import { Router } from "express";
import { getNotificationsAdmin, marquerNotificationLue } from "../controllers/notification.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", protect, authorize("ADMIN"), getNotificationsAdmin);
router.patch("/:id/lue", protect, authorize("ADMIN"), marquerNotificationLue);

export default router;