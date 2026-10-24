import { api } from "./api";

export interface RegisterClientPayload {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  telephone?: string;
}

export interface RegisterAgencePayload {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  raisonSociale: string;
  adresseAgence?: string;
}

export const registerClient = async (payload: RegisterClientPayload) => {
  const { data } = await api.post("/auth/register/client", payload);
  return data; // { token }
};

export const registerAgence = async (payload: RegisterAgencePayload) => {
  const { data } = await api.post("/auth/register/agence", payload);
  return data; // { message }
};

export const loginRequest = async (email: string, motDePasse: string) => {
  const { data } = await api.post("/auth/login", { email, motDePasse });
  return data; // { token }
};