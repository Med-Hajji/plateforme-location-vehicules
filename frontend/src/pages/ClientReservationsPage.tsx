import { useEffect, useState } from "react";
import type { Reservation } from "../types";
import { getMesReservationsClient } from "../services/reservation.service";

const STATUT_STYLES: Record<Reservation["statut"], string> = {
  EN_ATTENTE: "bg-amber-50 text-amber-700",
  CONFIRMEE: "bg-emerald-50 text-emerald-700",
  REFUSEE: "bg-red-50 text-red-700",
  ANNULEE: "bg-gray-100 text-gray-500",
};

const STATUT_LABELS: Record<Reservation["statut"], string> = {
  EN_ATTENTE: "En attente de réponse",
  CONFIRMEE: "Confirmée",
  REFUSEE: "Refusée",
  ANNULEE: "Annulée",
};

export default function ClientReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMesReservationsClient().then((data) => {
      setReservations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-extrabold mb-6">Mes réservations</h1>

      {loading && <p className="text-gray-400">Chargement...</p>}

      {!loading && reservations.length === 0 && (
        <p className="text-gray-400">Vous n'avez pas encore de réservation.</p>
      )}

      <div className="space-y-4">
        {reservations.map((r) => (
          <div key={r._id} className="border border-gray-200 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold">
                  {r.vehicule.marque} {r.vehicule.modele}
                </h3>
                <p className="text-gray-500 text-sm">
                  {r.agence.raisonSociale}
                </p>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full ${STATUT_STYLES[r.statut]}`}
              >
                {STATUT_LABELS[r.statut]}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Du {new Date(r.dateDebut).toLocaleDateString("fr-FR")} au{" "}
              {new Date(r.dateFin).toLocaleDateString("fr-FR")}
            </p>
            {r.messageAgence && (
              <p className="text-sm text-gray-500 mt-2 italic border-t border-gray-100 pt-2">
                « {r.messageAgence} »
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
