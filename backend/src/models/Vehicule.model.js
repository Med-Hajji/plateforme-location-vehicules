import mongoose from "mongoose";

const vehiculeSchema = new mongoose.Schema(
  {
    agence: { type: mongoose.Schema.Types.ObjectId, ref: "Agence", required: true },
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    annee: { type: Number },
    categorie: { type: String },
    carburant: { type: String },
    boiteVitesse: { type: String },
    nbPlaces: { type: Number },
    tarifJournalier: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    disponibilite: { type: Boolean, default: true },
    statutModeration: {
      type: String,
      enum: ["EN_ATTENTE", "PUBLIE", "REFUSE"],
      default: "EN_ATTENTE",
    },
    motifRefus: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Vehicule", vehiculeSchema);