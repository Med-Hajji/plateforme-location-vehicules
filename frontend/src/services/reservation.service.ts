import { api } from "./api";
import type { Reservation } from "../types";

export interface CreateReservationPayload {
  vehiculeId: string;
  dateDebut: string;
  dateFin: string;
}

export const createReservation = async (payload: CreateReservationPayload): Promise<Reservation> => {
  const { data } = await api.post("/reservations", payload);
  return data;
};

export const getMesReservationsClient = async (): Promise<Reservation[]> => {
  const { data } = await api.get("/reservations/client/mes-reservations");
  return data;
};

export const getMesReservationsAgence = async (): Promise<Reservation[]> => {
  const { data } = await api.get("/reservations/agence/mes-reservations");
  return data;
};

export const repondreReservation = async (
  id: string,
  statut: "CONFIRMEE" | "REFUSEE",
  messageAgence: string
): Promise<Reservation> => {
  const { data } = await api.patch(`/reservations/${id}/repondre`, { statut, messageAgence });
  return data;
};