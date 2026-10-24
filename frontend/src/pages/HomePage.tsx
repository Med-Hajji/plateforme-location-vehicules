import { useEffect, useState } from "react";
import type { Vehicule } from "../types";
import { getVehicules } from "../services/vehicule.service";
import VehicleCard from "../components/VehicleCard";

export default function HomePage() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehicules().then((data) => {
      setVehicules(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section className="max-w-6xl mx-auto px-10 pt-14 pb-10 text-center">
        <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
          ● 6 agences partenaires
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Un seul site, <span className="text-emerald-600">toutes</span> les
          agences.
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mt-4">
          Comparez et réservez en ligne les véhicules de plusieurs agences
          indépendantes.
        </p>
      </section>

      <section className="max-w-4xl mx-auto -mt-2 mb-14 px-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Ville
            </label>
            <select className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50">
              <option>Sousse</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Départ
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              placeholder="12 août"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Retour
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              placeholder="15 août"
            />
          </div>
          <button className="bg-emerald-600 text-white font-bold rounded-lg py-2.5 text-sm hover:bg-emerald-700">
            Rechercher
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-10 pb-20">
        <h2 className="text-2xl font-extrabold mb-6">Véhicules disponibles</h2>

        {loading ? (
          <p className="text-gray-400">Chargement des véhicules...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicules.map((v) => (
              <VehicleCard key={v._id} vehicule={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
