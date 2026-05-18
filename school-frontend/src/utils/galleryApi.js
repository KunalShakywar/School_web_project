import axios from "axios";
import { io } from "socket.io-client";
import { showAppToast } from "./appToast";

const getApiUrl = () => import.meta.env.VITE_API_URL || "http://localhost:5000";
const getGalleryUrl = () => `${getApiUrl()}/api/gallery`;

let gallerySocket = null;

const notifyGalleryUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("gallery-updated"));
  }

  showAppToast({
    title: "Gallery update",
    message: "A gallery like or image update just came in.",
    variant: "info",
  });
};

const connectGallerySocket = () => {
  if (gallerySocket) return gallerySocket;

  gallerySocket = io(getApiUrl(), {
    transports: ["websocket"],
  });

  gallerySocket.on("gallery-updated", notifyGalleryUpdated);

  return gallerySocket;
};

export const startGalleryRealtime = () => connectGallerySocket();

export const stopGalleryRealtime = () => {
  if (!gallerySocket) return;
  gallerySocket.off("gallery-updated", notifyGalleryUpdated);
  gallerySocket.disconnect();
  gallerySocket = null;
};

export const readGallery = async () => {
  const response = await axios.get(getGalleryUrl());
  return response.data?.data ?? [];
};

export const toggleGalleryLike = async (id) => {
  const response = await axios.patch(`${getGalleryUrl()}/${id}/like`);
  return response.data?.data ?? null;
};
