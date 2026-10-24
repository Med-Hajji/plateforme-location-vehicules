import Notification from "../models/Notification.model.js";

export const getNotificationsAdmin = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const marquerNotificationLue = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { lue: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification introuvable." });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};