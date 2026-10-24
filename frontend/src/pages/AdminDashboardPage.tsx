import { useEffect, useState } from "react";
import type { Vehicule, Notification, Agence } from "../types";
import {
  getVehiculesEnAttenteAdmin,
  validerVehiculeAdmin,
  refuserVehiculeAdmin,
} from "../services/vehicule.service";
import {
  getNotificationsAdmin,
  marquerNotificationLue,
} from "../services/notification.service";
import {
  getAgencesEnAttenteAdmin,
  validerAgenceAdmin,
} from "../services/agence.service";
import { API_ORIGIN } from "../services/api";

export default function AdminDashboardPage() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [agences, setAgences] = useState<Agence[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [motifRefus, setMotifRefus] = useState<Record<string, string>>({});

  const charger = () => {
    Promise.all([
      getVehiculesEnAttenteAdmin(),
      getNotificationsAdmin(),
      getAgencesEnAttenteAdmin(),
    ]).then(([v, n, a]) => {
      setVehicules(v);
      setNotifications(n);
      setAgences(a);
      setLoading(false);
    });
  };

  useEffect(() => {
    charger();
  }, []);

  const handleValiderAgence = async (id: string) => {
    setBusyId(id);
    try {
      await validerAgenceAdmin(id);
      charger();
    } finally {
      setBusyId(null);
    }
  };

  const handleValiderVehicule = async (id: string) => {
    setBusyId(id);
    try {
      await validerVehiculeAdmin(id);
      charger();
    } finally {
      setBusyId(null);
    }
  };

  const handleRefuserVehicule = async (id: string) => {
    setBusyId(id);
    try {
      await refuserVehiculeAdmin(
        id,
        motifRefus[id] || "Non conforme aux critères de la plateforme.",
      );
      charger();
    } finally {
      setBusyId(null);
    }
  };

  const handleLireNotification = async (id: string) => {
    await marquerNotificationLue(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, lue: true } : n)),
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Colonne principale */}
      <div className="md:col-span-2 space-y-12">
        {/* --- Section Agences en attente --- */}
        <div>
          <h1 className="text-2xl font-extrabold mb-6">
            Agences en attente de validation
          </h1>

          {!loading && agences.length === 0 && (
            <p className="text-gray-400">Aucune agence en attente.</p>
          )}

          <div className="space-y-4">
            {agences.map((a) => (
              <div
                key={a._id}
                className="border border-gray-200 rounded-2xl p-5"
              >
                <h3 className="font-bold">{a.raisonSociale}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  Contact : {a.user.prenom} {a.user.nom} ({a.user.email})
                  {a.adresseAgence ? ` · ${a.adresseAgence}` : ""}
                </p>
                <button
                  onClick={() => handleValiderAgence(a._id)}
                  disabled={busyId === a._id}
                  className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-700 disabled:opacity-60"
                >
                  Valider cette agence
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- Section Véhicules en attente --- */}
        <div>
          <h2 className="text-2xl font-extrabold mb-6">
            Véhicules en attente de validation
          </h2>

          {!loading && vehicules.length === 0 && (
            <p className="text-gray-400">Aucun véhicule en attente.</p>
          )}

          <div className="space-y-4">
            {vehicules.map((v) => (
              <div
                key={v._id}
                className="border border-gray-200 rounded-2xl p-5 flex gap-4"
              >
                <div className="w-28 h-20 bg-gradient-to-br from-[#EDEAE0] to-[#DCE8E2] rounded-xl overflow-hidden flex items-center justify-center text-gray-400 text-[10px] flex-shrink-0">
                  {v.image ? (
                    <img
                      src={`${API_ORIGIN}${v.image}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Pas de photo"
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">
                    {v.marque} {v.modele}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {v.agence.raisonSociale} · {v.tarifJournalier} DT/jour
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleValiderVehicule(v._id)}
                      disabled={busyId === v._id}
                      className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-emerald-700 disabled:opacity-60"
                    >
                      Valider et publier
                    </button>
                    <input
                      placeholder="Motif de refus (optionnel)"
                      value={motifRefus[v._id] || ""}
                      onChange={(e) =>
                        setMotifRefus({
                          ...motifRefus,
                          [v._id]: e.target.value,
                        })
                      }
                      className="border rounded-lg px-3 py-2 text-xs bg-gray-50 flex-1 min-w-[160px]"
                    />
                    <button
                      onClick={() => handleRefuserVehicule(v._id)}
                      disabled={busyId === v._id}
                      className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-full hover:bg-gray-50 disabled:opacity-60"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Colonne latérale : notifications */}
      <div>
        <h2 className="text-lg font-extrabold mb-4">Notifications</h2>
        <div className="space-y-2">
          {notifications.length === 0 && (
            <p className="text-gray-400 text-sm">Aucune notification.</p>
          )}
          {notifications.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.lue && handleLireNotification(n._id)}
              className={`border rounded-xl p-3 text-sm cursor-pointer ${
                n.lue
                  ? "border-gray-100 text-gray-400"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800 font-medium"
              }`}
            >
              <p>{n.message}</p>
              <p className="text-[11px] opacity-70 mt-1">
                {new Date(n.createdAt).toLocaleString("fr-FR")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
