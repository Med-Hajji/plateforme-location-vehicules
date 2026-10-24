import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import Client from "../models/Client.model.js";
import Agence from "../models/Agence.model.js";

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

export const registerClient = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, telephone } = req.body;

    const existant = await User.findOne({ email });
    if (existant) return res.status(409).json({ message: "Cet e-mail est déjà utilisé." });

    const user = await User.create({ nom, prenom, email, motDePasse, role: "CLIENT" });
    await Client.create({ user: user._id, telephone });

    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const registerAgence = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse, raisonSociale, adresseAgence } = req.body;

    const existant = await User.findOne({ email });
    if (existant) return res.status(409).json({ message: "Cet e-mail est déjà utilisé." });

    const user = await User.create({ nom, prenom, email, motDePasse, role: "AGENCE" });
    await Agence.create({ user: user._id, raisonSociale, adresseAgence });

    res.status(201).json({ message: "Inscription reçue. En attente de validation par l'administrateur." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Identifiants invalides." });

    const motDePasseValide = await user.comparePassword(motDePasse);
    if (!motDePasseValide) return res.status(401).json({ message: "Identifiants invalides." });

    let agenceId = null;
    if (user.role === "AGENCE") {
      const agence = await Agence.findOne({ user: user._id });
      if (agence.statutValidation !== "ACTIF") {
        return res.status(403).json({ message: "Votre compte agence est en attente de validation." });
      }
      agenceId = agence._id;
    }

    const token = generateToken({ userId: user._id, role: user.role, agenceId });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};