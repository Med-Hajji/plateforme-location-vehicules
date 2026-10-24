import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { registerAgence } from "../services/auth.service";

export default function RegisterAgencePage() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    raisonSociale: "",
    adresseAgence: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerAgence(form);
      setSuccess(true);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Une erreur est survenue.");
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-5">
          ✓
        </div>
        <h1 className="text-xl font-extrabold mb-2">Inscription reçue</h1>
        <p className="text-gray-500 text-sm">
          Votre demande a bien été enregistrée. Un administrateur va vérifier
          vos informations avant d'activer votre compte agence.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 text-emerald-700 font-semibold text-sm"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold mb-1">
        Devenir agence partenaire
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Publiez votre parc de véhicules et gérez vos réservations en ligne.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Prénom (contact)
            </label>
            <input
              name="prenom"
              required
              value={form.prenom}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Nom (contact)
            </label>
            <input
              name="nom"
              required
              value={form.nom}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            Raison sociale de l'agence
          </label>
          <input
            name="raisonSociale"
            required
            value={form.raisonSociale}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            Adresse de l'agence
          </label>
          <input
            name="adresseAgence"
            value={form.adresseAgence}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            E-mail professionnel
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            Mot de passe
          </label>
          <input
            type="password"
            name="motDePasse"
            required
            minLength={6}
            value={form.motDePasse}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E2A26] text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Envoi..." : "Soumettre ma demande"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Déjà partenaire ?{" "}
        <Link to="/login" className="text-emerald-700 font-semibold">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
