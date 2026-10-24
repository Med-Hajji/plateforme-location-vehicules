import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { isAxiosError } from "axios";
import type { Vehicule } from "../types";
import {
  getMesVehiculesAgence,
  createVehiculeAgence,
} from "../services/vehicule.service";
import { API_ORIGIN } from "../services/api";

export default function AgenceVehiculesPage() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    marque: "",
    modele: "",
    annee: "",
    categorie: "",
    carburant: "",
    boiteVitesse: "",
    nbPlaces: "",
    tarifJournalier: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const charger = () => {
    getMesVehiculesAgence().then((data) => {
      setVehicules(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    charger();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await createVehiculeAgence({
        marque: form.marque,
        modele: form.modele,
        annee: form.annee ? Number(form.annee) : undefined,
        categorie: form.categorie,
        carburant: form.carburant,
        boiteVitesse: form.boiteVitesse,
        nbPlaces: form.nbPlaces ? Number(form.nbPlaces) : undefined,
        tarifJournalier: Number(form.tarifJournalier),
        description: form.description,
        image,
      });
      setForm({
        marque: "",
        modele: "",
        annee: "",
        categorie: "",
        carburant: "",
        boiteVitesse: "",
        nbPlaces: "",
        tarifJournalier: "",
        description: "",
      });
      setImage(null);
      setShowForm(false);
      charger();
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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Mes véhicules</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-emerald-700"
        >
          {showForm ? "Annuler" : "+ Ajouter un véhicule"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Marque
              </label>
              <input
                name="marque"
                required
                value={form.marque}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Modèle
              </label>
              <input
                name="modele"
                required
                value={form.modele}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Année
              </label>
              <input
                name="annee"
                type="number"
                value={form.annee}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Places
              </label>
              <input
                name="nbPlaces"
                type="number"
                value={form.nbPlaces}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Tarif / jour (DT)
              </label>
              <input
                name="tarifJournalier"
                type="number"
                required
                value={form.tarifJournalier}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Catégorie
              </label>
              <select
                name="categorie"
                value={form.categorie}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              >
                <option value="">—</option>
                <option>Citadine</option>
                <option>Berline</option>
                <option>SUV</option>
                <option>Utilitaire</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Carburant
              </label>
              <select
                name="carburant"
                value={form.carburant}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              >
                <option value="">—</option>
                <option>Essence</option>
                <option>Diesel</option>
                <option>Électrique</option>
                <option>Hybride</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                Boîte
              </label>
              <select
                name="boiteVitesse"
                value={form.boiteVitesse}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
              >
                <option value="">—</option>
                <option>Manuelle</option>
                <option>Automatique</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2.5 text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5">
              Photo du véhicule
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-emerald-600 text-white font-bold rounded-lg px-6 py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Publication..." : "Publier ce véhicule"}
          </button>
        </form>
      )}

      {loading && <p className="text-gray-400">Chargement...</p>}
      {!loading && vehicules.length === 0 && (
        <p className="text-gray-400">Aucun véhicule publié pour l'instant.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicules.map((v) => (
          <div
            key={v._id}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white"
          >
            <div className="h-36 bg-gradient-to-br from-[#EDEAE0] to-[#DCE8E2] flex items-center justify-center text-gray-400 text-xs overflow-hidden">
              {v.image ? (
                <img
                  src={`${API_ORIGIN}${v.image}`}
                  alt={`${v.marque} ${v.modele}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Pas de photo"
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-base">
                {v.marque} {v.modele}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {v.tarifJournalier} DT/jour
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
