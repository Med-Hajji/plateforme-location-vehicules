import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, motDePasse);
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
      <h1 className="text-2xl font-extrabold mb-1">Connexion</h1>
      <p className="text-gray-500 text-sm mb-8">
        Accédez à votre compte RoutePartage.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            E-mail
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5">
            Mot de passe
          </label>
          <input
            type="password"
            required
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Pas encore de compte ?{" "}
        <Link to="/register/client" className="text-emerald-700 font-semibold">
          Client
        </Link>
        {" · "}
        <Link to="/register/agence" className="text-emerald-700 font-semibold">
          Agence
        </Link>
      </p>
    </div>
  );
}
