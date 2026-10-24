import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    motDePasse: { type: String, required: true },
    role: { type: String, enum: ["CLIENT", "AGENCE", "ADMIN"], required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("motDePasse")) return;
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
});

userSchema.methods.comparePassword = async function (motDePasseSaisi) {
  return bcrypt.compare(motDePasseSaisi, this.motDePasse);
};

export default mongoose.model("User", userSchema);