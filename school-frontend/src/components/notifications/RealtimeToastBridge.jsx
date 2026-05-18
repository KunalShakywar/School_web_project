import { useEffect } from "react";
import {
  startAnnouncementsRealtime,
  stopAnnouncementsRealtime,
} from "../../utils/announcementsApi";
import {
  startGalleryRealtime,
  stopGalleryRealtime,
} from "../../utils/galleryApi";

export default function RealtimeToastBridge() {
  useEffect(() => {
    startGalleryRealtime();
    startAnnouncementsRealtime();

    return () => {
      stopGalleryRealtime();
      stopAnnouncementsRealtime();
    };
  }, []);

  return null;
}
