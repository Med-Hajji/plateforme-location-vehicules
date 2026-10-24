import Agence from "../models/Agence.model.js";

export const getAgencesEnAttenteAdmin = async (req, res) => {
  try {
    const agences = await Agence.find({ statutValidation: "EN_ATTENTE" })
      .populate("user", "nom prenom email")
      .sort({ createdAt: -1 });
    res.json(agences);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const validerAgence = async (req, res) => {
  try {
    const agence = await Agence.findByIdAndUpdate(
      req.params.id,
      { statutValidation: "ACTIF" },
      { new: true }
    );
    if (!agence) return res.status(404).json({ message: "Agence introuvable." });
    res.json({ message: "Agence validée avec succès.", agence });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const suspendreAgence = async (req, res) => {
  try {
    const agence = await Agence.findByIdAndUpdate(
      req.params.id,
      { statutValidation: "SUSPENDU" },
      { new: true }
    );
    if (!agence) return res.status(404).json({ message: "Agence introuvable." });
    res.json({ message: "Agence suspendue.", agence });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};