import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicule", required: true },
    agence: { type: mongoose.Schema.Types.ObjectId, ref: "Agence", required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    statut: {
      type: String,
      enum: ["EN_ATTENTE", "CONFIRMEE", "REFUSEE", "ANNULEE"],
      default: "EN_ATTENTE",
    },
    messageAgence: { type: String }, // ex: motif de refus, ou note d'acceptation
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);