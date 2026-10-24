import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["NOUVELLE_RESERVATION", "NOUVEAU_VEHICULE"],
      required: true,
    },
    message: { type: String, required: true },
    lienType: { type: String, enum: ["RESERVATION", "VEHICULE"] },
    lienId: { type: mongoose.Schema.Types.ObjectId },
    lue: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);