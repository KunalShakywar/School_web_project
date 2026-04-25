import jsPDF from "jspdf";
import { toDisplayDate } from "./announcementUtils.jsx";

export function exportAnnouncementsPdf(filteredAnnouncements) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Announcements / Notices / News", 20, 20);

  let y = 32;
  filteredAnnouncements.forEach((announcement, index) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. ${announcement.title}`, 20, y);
    y += 7;
    doc.text(`Type: ${announcement.type}`, 25, y);
    y += 7;
    doc.text(`Date: ${toDisplayDate(announcement.date)}`, 25, y);
    y += 7;
    doc.text(`Classes: ${(announcement.classes || ["All"]).join(", ")}`, 25, y);
    y += 7;
    doc.text(`Popup: ${announcement.popup ? "Yes" : "No"}`, 25, y);
    y += 7;
    doc.text(`Published: ${announcement.isPublished ? "Yes" : "No"}`, 25, y);
    y += 7;
    doc.text(`Description: ${announcement.description}`, 25, y);
    y += 12;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("announcements.pdf");
}
