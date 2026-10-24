import { api } from "./api";
import type { Agence } from "../types";

export const getAgencesEnAttenteAdmin = async (): Promise<Agence[]> => {
  const { data } = await api.get("/agences/admin/en-attente");
  return data;
};

export const validerAgenceAdmin = async (id: string) => {
  const { data } = await api.patch(`/agences/${id}/valider`);
  return data;
};

export const suspendreAgenceAdmin = async (id: string) => {
  const { data } = await api.patch(`/agences/${id}/suspendre`);
  return data;
};