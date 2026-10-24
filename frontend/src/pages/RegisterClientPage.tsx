import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { registerClient } from "../services/auth.service";
import { useAuth } from "../context/useAuth";

export default function RegisterClientPage() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    telephone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTokenDirectly } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await registerClient(form);
      setTokenDirectly(data.token);
      navigate("/");
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

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-extrabold mb-1">Créer un compte Client</h1>
      <p className="text-gray-500 text-sm mb-8">
        Réservez des véhicules chez toutes nos agences partenaires.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Prénom
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
              Nom
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
            E-mail
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
            Téléphone
          </label>
          <input
            name="telephone"
            value={form.telephone}
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
          className="w-full bg-emerald-600 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Déjà un compte ?{" "}
        <Link to="/login" className="text-emerald-700 font-semibold">
          Se connecter
        </Link>
      </p>
    </div>
  );
}
