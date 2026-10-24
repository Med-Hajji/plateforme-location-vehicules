import { useEffect, useState, type FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { isAxiosError } from "axios";
import type { Vehicule } from "../types";
import { getVehiculeById } from "../services/vehicule.service";
import { createReservation } from "../services/reservation.service";
import { useAuth } from "../context/useAuth";
import { API_ORIGIN } from "../services/api";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [vehicule, setVehicule] = useState<Vehicule | null>(null);
  const [loading, setLoading] = useState(true);

  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    getVehiculeById(id).then((data) => {
      setVehicule(data);
      setLoading(false);
    });
  }, [id]);

  const handleReserverClick = () => {
    if (!auth.token) {
      navigate("/register/client", { state: { from: `/vehicules/${id}` } });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setError("");
    setSubmitting(true);
    try {
      await createReservation({ vehiculeId: id, dateDebut, dateFin });
      setSuccess(true);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message || "Une erreur est survenue.");
      } else {
        setError("Une erreur est survenue.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400 py-20">
        Chargement du véhicule...
      </p>
    );
  }

  if (!vehicule) {
    return (
      <p className="text-center text-gray-400 py-20">Véhicule introuvable.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <div className="h-56 bg-gradient-to-br from-[#EDEAE0] to-[#DCE8E2] rounded-2xl flex items-center justify-center text-gray-400 text-sm mb-6 overflow-hidden">
          {vehicule.image ? (
            <img
              src={`${API_ORIGIN}${vehicule.image}`}
              alt={`${vehicule.marque} ${vehicule.modele}`}
              className="w-full h-full object-cover"
            />
          ) : (
            "Photo du véhicule"
          )}
        </div>

        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          ✓ {vehicule.agence.raisonSociale}
        </span>

        <h1 className="text-2xl font-extrabold mb-1">
          {vehicule.marque} {vehicule.modele}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          {vehicule.boiteVitesse} · {vehicule.carburant} · {vehicule.nbPlaces}{" "}
          places
          {vehicule.annee ? ` · ${vehicule.annee}` : ""}
        </p>

        {vehicule.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {vehicule.description}
          </p>
        )}

        {vehicule.agence.adresseAgence && (
          <p className="text-gray-400 text-xs">
            Agence basée à {vehicule.agence.adresseAgence}
          </p>
        )}

        <div className="font-extrabold text-2xl mt-6">
          {vehicule.tarifJournalier} DT
          <span className="text-gray-400 font-medium text-sm"> /jour</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 h-fit">
        <h2 className="font-bold text-lg mb-4">Réserver ce véhicule</h2>

        {success && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mx-auto mb-4">
              ✓
            </div>
            <p className="font-bold mb-1">Demande envoyée</p>
            <p className="text-gray-500 text-sm mb-4">
              L'agence va examiner votre demande et vous répondra bientôt.
            </p>
            <Link
              to="/mes-reservations"
              className="text-emerald-700 font-semibold text-sm"
            >
              Voir mes réservations
            </Link>
          </div>
        )}

        {!success && !auth.token && (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              Créez un compte pour envoyer une demande de réservation à
              l'agence.
            </p>
            <button
              onClick={handleReserverClick}
              className="w-full bg-emerald-600 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700"
            >
              Créer un compte pour réserver
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-emerald-700 font-semibold">
                Se connecter
              </Link>
            </p>
          </div>
        )}

        {!success && auth.token && auth.role !== "CLIENT" && (
          <p className="text-gray-500 text-sm">
            Connectez-vous avec un compte client pour réserver ce véhicule.
          </p>
        )}

        {!success && auth.token && auth.role === "CLIENT" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Date de départ
              </label>
              <input
                type="date"
                required
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Date de retour
              </label>
              <input
                type="date"
                required
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? "Envoi..." : "Envoyer la demande"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
