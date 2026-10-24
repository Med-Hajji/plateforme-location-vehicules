import { useEffect, useState } from "react";
import type { Reservation } from "../types";
import {
  getMesReservationsAgence,
  repondreReservation,
} from "../services/reservation.service";

export default function AgenceReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondingId, setRespondingId] = useState<string | null>(null);

  const charger = () => {
    getMesReservationsAgence().then((data) => {
      setReservations(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    charger();
  }, []);

  const handleReponse = async (id: string, statut: "CONFIRMEE" | "REFUSEE") => {
    const messageAgence =
      statut === "CONFIRMEE"
        ? "Réservation acceptée, véhicule disponible aux dates demandées."
        : "Désolé, ce véhicule n'est pas disponible à ces dates.";

    setRespondingId(id);
    try {
      await repondreReservation(id, statut, messageAgence);
      charger(); // recharge la liste pour refléter le nouveau statut
    } finally {
      setRespondingId(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold mb-6">Demandes de réservation</h1>

      {loading && <p className="text-gray-400">Chargement...</p>}

      {!loading && reservations.length === 0 && (
        <p className="text-gray-400">Aucune demande pour le moment.</p>
      )}

      <div className="space-y-4">
        {reservations.map((r) => {
          const clientInfo = typeof r.client === "object" ? r.client : null;

          return (
            <div key={r._id} className="border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold">
                    {r.vehicule.marque} {r.vehicule.modele}
                  </h3>
                  {clientInfo && (
                    <p className="text-gray-500 text-sm">
                      Demandé par {clientInfo.user.prenom} {clientInfo.user.nom}{" "}
                      ({clientInfo.user.email})
                    </p>
                  )}
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700">
                  {r.statut === "EN_ATTENTE" ? "En attente" : r.statut}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Du {new Date(r.dateDebut).toLocaleDateString("fr-FR")} au{" "}
                {new Date(r.dateFin).toLocaleDateString("fr-FR")}
              </p>

              {r.statut === "EN_ATTENTE" ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReponse(r._id, "CONFIRMEE")}
                    disabled={respondingId === r._id}
                    className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-700 disabled:opacity-60"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => handleReponse(r._id, "REFUSEE")}
                    disabled={respondingId === r._id}
                    className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-50 disabled:opacity-60"
                  >
                    Refuser
                  </button>
                </div>
              ) : (
                r.messageAgence && (
                  <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-2">
                    « {r.messageAgence} »
                  </p>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
