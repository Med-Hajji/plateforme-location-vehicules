import Reservation from "../models/Reservation.model.js";
import Vehicule from "../models/Vehicule.model.js";
import Client from "../models/Client.model.js";
import Notification from "../models/Notification.model.js";

export const createReservation = async (req, res) => {
  try {
    const { vehiculeId, dateDebut, dateFin } = req.body;

    const vehicule = await Vehicule.findById(vehiculeId);
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    if (!vehicule.disponibilite) return res.status(400).json({ message: "Ce véhicule n'est pas disponible." });

    const client = await Client.findOne({ user: req.user.userId });
    if (!client) return res.status(404).json({ message: "Profil client introuvable." });

    const reservation = await Reservation.create({
      client: client._id,
      vehicule: vehicule._id,
      agence: vehicule.agence,
      dateDebut,
      dateFin,
    });

    await Notification.create({
      type: "NOUVELLE_RESERVATION",
      message: `Nouvelle réservation effectuée pour "${vehicule.marque} ${vehicule.modele}".`,
      lienType: "RESERVATION",
      lienId: reservation._id,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getMesReservationsClient = async (req, res) => {
  try {
    const client = await Client.findOne({ user: req.user.userId });
    if (!client) return res.status(404).json({ message: "Profil client introuvable." });

    const reservations = await Reservation.find({ client: client._id })
      .populate("vehicule", "marque modele tarifJournalier")
      .populate("agence", "raisonSociale")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getMesReservationsAgence = async (req, res) => {
  try {
    const reservations = await Reservation.find({ agence: req.user.agenceId })
      .populate("vehicule", "marque modele")
      .populate({ path: "client", populate: { path: "user", select: "nom prenom email" } })
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const repondreReservation = async (req, res) => {
  try {
    const { statut, messageAgence } = req.body;

    if (!["CONFIRMEE", "REFUSEE"].includes(statut)) {
      return res.status(400).json({ message: "Statut invalide." });
    }

    const reservation = await Reservation.findOneAndUpdate(
      { _id: req.params.id, agence: req.user.agenceId },
      { statut, messageAgence },
      { new: true }
    );

    if (!reservation) return res.status(404).json({ message: "Réservation introuvable." });

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// --- ADMIN : vue transversale de toutes les réservations ---
export const getAllReservationsAdmin = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("vehicule", "marque modele")
      .populate("agence", "raisonSociale")
      .populate({ path: "client", populate: { path: "user", select: "nom prenom email" } })
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};