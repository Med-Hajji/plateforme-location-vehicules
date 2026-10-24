import { Link } from "react-router-dom";
import type { Vehicule } from "../types";
import { API_ORIGIN } from "../services/api";

export default function VehicleCard({ vehicule }: { vehicule: Vehicule }) {
  return (
    <Link
      to={`/vehicules/${vehicule._id}`}
      className="block border border-gray-200 rounded-2xl overflow-hidden bg-white hover:-translate-y-1 hover:shadow-lg transition"
    >
      <div className="h-36 bg-gradient-to-br from-[#EDEAE0] to-[#DCE8E2] flex items-center justify-center text-gray-400 text-xs overflow-hidden">
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
      <div className="p-4">
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
          ✓ {vehicule.agence.raisonSociale}
        </span>
        <h3 className="font-bold text-base">
          {vehicule.marque} {vehicule.modele}
        </h3>
        <p className="text-gray-500 text-sm mt-1 mb-3">
          {vehicule.boiteVitesse} · {vehicule.carburant}
        </p>
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-lg">
            {vehicule.tarifJournalier} DT
            <span className="text-gray-400 font-medium text-xs"> /jour</span>
          </div>
          <span className="bg-[#1E2A26] text-white text-xs font-bold px-4 py-2 rounded-full">
            Voir
          </span>
        </div>
      </div>
    </Link>
  );
}
