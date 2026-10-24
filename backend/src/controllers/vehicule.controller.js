import Vehicule from "../models/Vehicule.model.js";
import Agence from "../models/Agence.model.js";
import Notification from "../models/Notification.model.js";

export const createVehicule = async (req, res) => {
  try {
    const { marque, modele, annee, categorie, carburant, boiteVitesse, nbPlaces, tarifJournalier, description } = req.body;

    const vehicule = await Vehicule.create({
      agence: req.user.agenceId,
      marque,
      modele,
      annee: annee ? Number(annee) : undefined,
      categorie,
      carburant,
      boiteVitesse,
      nbPlaces: nbPlaces ? Number(nbPlaces) : undefined,
      tarifJournalier: Number(tarifJournalier),
      description,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    await Notification.create({
      type: "NOUVEAU_VEHICULE",
      message: `Nouveau véhicule "${marque} ${modele}" publié, en attente de validation.`,
      lienType: "VEHICULE",
      lienId: vehicule._id,
    });

    res.status(201).json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getMesVehicules = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ agence: req.user.agenceId }).sort({ createdAt: -1 });
    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const updateVehicule = async (req, res) => {
  try {
    const vehicule = await Vehicule.findOneAndUpdate(
      { _id: req.params.id, agence: req.user.agenceId },
      req.body,
      { new: true }
    );
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const deleteVehicule = async (req, res) => {
  try {
    const vehicule = await Vehicule.findOneAndDelete({ _id: req.params.id, agence: req.user.agenceId });
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    res.json({ message: "Véhicule supprimé." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// PUBLIC : uniquement les véhicules validés par l'admin, d'agences actives, disponibles
export const getVehiculesPublic = async (req, res) => {
  try {
    const agencesActives = await Agence.find({ statutValidation: "ACTIF" }).select("_id");
    const agenceIds = agencesActives.map((a) => a._id);

    const vehicules = await Vehicule.find({
      agence: { $in: agenceIds },
      disponibilite: true,
      statutModeration: "PUBLIE",
    })
      .populate("agence", "raisonSociale")
      .sort({ createdAt: -1 });

    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const getVehiculeById = async (req, res) => {
  try {
    const vehicule = await Vehicule.findById(req.params.id).populate("agence", "raisonSociale adresseAgence");
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// --- ADMIN : véhicules en attente de modération ---
export const getVehiculesEnAttenteAdmin = async (req, res) => {
  try {
    const vehicules = await Vehicule.find({ statutModeration: "EN_ATTENTE" })
      .populate("agence", "raisonSociale")
      .sort({ createdAt: -1 });
    res.json(vehicules);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// --- ADMIN : valider (publier) un véhicule ---
export const validerVehiculeAdmin = async (req, res) => {
  try {
    const vehicule = await Vehicule.findByIdAndUpdate(
      req.params.id,
      { statutModeration: "PUBLIE", motifRefus: undefined },
      { new: true }
    );
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// --- ADMIN : refuser un véhicule ---
export const refuserVehiculeAdmin = async (req, res) => {
  try {
    const { motifRefus } = req.body;
    const vehicule = await Vehicule.findByIdAndUpdate(
      req.params.id,
      { statutModeration: "REFUSE", motifRefus },
      { new: true }
    );
    if (!vehicule) return res.status(404).json({ message: "Véhicule introuvable." });
    res.json(vehicule);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};