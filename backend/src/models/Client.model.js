import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    telephone: { type: String },
    numeroPermis: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);