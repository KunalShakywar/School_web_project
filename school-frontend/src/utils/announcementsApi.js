import axios from "axios";

export const ANNOUNCEMENTS_UPDATED_EVENT = "announcements-updated";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000";
const getAnnouncementsUrl = () => `${getApiUrl()}/api/announcements`;

const notifyAnnouncementsUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ANNOUNCEMENTS_UPDATED_EVENT));
  }
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
