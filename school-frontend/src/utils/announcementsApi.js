import axios from "axios";
import { io } from "socket.io-client";
import { showAppToast } from "./appToast";

export const ANNOUNCEMENTS_UPDATED_EVENT = "announcements-updated";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000";
const getAnnouncementsUrl = () => `${getApiUrl()}/api/announcements`;
const getSocketUrl = () => getApiUrl();

let announcementsSocket = null;

const notifyAnnouncementsUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ANNOUNCEMENTS_UPDATED_EVENT));
  }

  showAppToast({
    title: "Announcements updated",
    message: "Notice or news was changed live.",
    variant: "info",
  });
};

const connectAnnouncementsSocket = () => {
  if (announcementsSocket) return announcementsSocket;

  announcementsSocket = io(getSocketUrl(), {
    transports: ["websocket"],
  });

  announcementsSocket.on("announcements-updated", notifyAnnouncementsUpdated);

  return announcementsSocket;
};

export const startAnnouncementsRealtime = () => connectAnnouncementsSocket();

export const stopAnnouncementsRealtime = () => {
  if (!announcementsSocket) return;
  announcementsSocket.off("announcements-updated", notifyAnnouncementsUpdated);
  announcementsSocket.disconnect();
  announcementsSocket = null;
};

export const readAnnouncements = async (params = {}) => {
  const response = await axios.get(getAnnouncementsUrl(), { params });
  return response.data?.data ?? [];
};

export const createAnnouncement = async (payload) => {
  const response = await axios.post(getAnnouncementsUrl(), payload);
  notifyAnnouncementsUpdated();
  return response.data?.data ?? null;
};

export const updateAnnouncement = async (id, payload) => {
  const response = await axios.put(`${getAnnouncementsUrl()}/${id}`, payload);
  notifyAnnouncementsUpdated();
  return response.data?.data ?? null;
};

export const removeAnnouncement = async (id) => {
  const response = await axios.delete(`${getAnnouncementsUrl()}/${id}`);
  notifyAnnouncementsUpdated();
  return response.data?.data ?? null;
};
