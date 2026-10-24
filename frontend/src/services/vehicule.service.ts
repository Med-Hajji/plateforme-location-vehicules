import { api } from "./api";
import type { Vehicule } from "../types";

export const getVehicules = async (): Promise<Vehicule[]> => {
  const { data } = await api.get("/vehicules");
  return data;
};

export const getVehiculeById = async (id: string): Promise<Vehicule> => {
  const { data } = await api.get(`/vehicules/${id}`);
  return data;
};

export const getMesVehiculesAgence = async (): Promise<Vehicule[]> => {
  const { data } = await api.get("/vehicules/agence/mes-vehicules");
  return data;
};

export interface CreateVehiculePayload {
  marque: string;
  modele: string;
  annee?: number;
  categorie?: string;
  carburant?: string;
  boiteVitesse?: string;
  nbPlaces?: number;
  tarifJournalier: number;
  description?: string;
  image?: File | null;
}

export const createVehiculeAgence = async (payload: CreateVehiculePayload): Promise<Vehicule> => {
  const formData = new FormData();
  formData.append("marque", payload.marque);
  formData.append("modele", payload.modele);
  if (payload.annee) formData.append("annee", String(payload.annee));
  if (payload.categorie) formData.append("categorie", payload.categorie);
  if (payload.carburant) formData.append("carburant", payload.carburant);
  if (payload.boiteVitesse) formData.append("boiteVitesse", payload.boiteVitesse);
  if (payload.nbPlaces) formData.append("nbPlaces", String(payload.nbPlaces));
  formData.append("tarifJournalier", String(payload.tarifJournalier));
  if (payload.description) formData.append("description", payload.description);
  if (payload.image) formData.append("image", payload.image);

  const { data } = await api.post("/vehicules", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const getVehiculesEnAttenteAdmin = async (): Promise<Vehicule[]> => {
  const { data } = await api.get("/vehicules/admin/en-attente");
  return data;
};

export const validerVehiculeAdmin = async (id: string): Promise<Vehicule> => {
  const { data } = await api.patch(`/vehicules/${id}/valider`);
  return data;
};

export const refuserVehiculeAdmin = async (id: string, motifRefus: string): Promise<Vehicule> => {
  const { data } = await api.patch(`/vehicules/${id}/refuser`, { motifRefus });
  return data;
};