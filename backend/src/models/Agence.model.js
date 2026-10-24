import mongoose from "mongoose";

const agenceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    raisonSociale: { type: String, required: true },
    adresseAgence: { type: String },
    statutValidation: {
      type: String,
      enum: ["EN_ATTENTE", "ACTIF", "SUSPENDU", "REJETE"],
      default: "EN_ATTENTE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Agence", agenceSchema);