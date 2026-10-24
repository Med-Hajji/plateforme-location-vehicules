import { api } from "./api";
import type { Notification } from "../types";

export const getNotificationsAdmin = async (): Promise<Notification[]> => {
  const { data } = await api.get("/notifications");
  return data;
};

export const marquerNotificationLue = async (id: string): Promise<Notification> => {
  const { data } = await api.patch(`/notifications/${id}/lue`);
  return data;
};