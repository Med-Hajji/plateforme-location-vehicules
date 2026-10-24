import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existant = await User.findOne({ email: "admin@plateforme.com" });
  if (existant) {
    console.log("Cet admin existe déjà.");
    process.exit(0);
  }

  const admin = await User.create({
    nom: "Admin",
    prenom: "Principal",
    email: "admin@plateforme.com",
    motDePasse: "admin1234",
    role: "ADMIN",
  });

  console.log("Admin créé :", admin.email);
  process.exit(0);
};

run();