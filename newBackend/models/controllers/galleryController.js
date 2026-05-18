import Gallery from "../gallery/galleryModel.js";
import { getSocketIO } from "../../config/socket.js";

const DEFAULT_GALLERY_ITEMS = [
  {
    src: "https://imgs.search.brave.com/DsKFhvlYheX7q3rktNialHXKfW8nRKC2XB21E7mVapQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZXNr/LTY0NTk0MS5qcGc",
    title: "Annual Function",
    description: "Students performing cultural dance.",
  },
  {
    src: "https://imgs.search.brave.com/N0ezdGED2AFhtZcPfe1eb9mHvKHMq9NuyyyLVci4sBg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2lraWhvdy5jb20v/aW1hZ2VzL3RodW1i/LzUvNTMvRnVubnkt/UmFuZG9tLUl0ZW1z/LXRvLUJyaW5nLXRv/LVNjaG9vbC1TdGVw/LTEuanBnL3Y0LTQ2/MHB4LUZ1bm55LVJh/bmRvbS1JdGVtcy10/by1CcmluZy10by1T/Y2hvb2wtU3RlcC0x/LmpwZw",
    title: "Sports Day",
    description: "100m race competition moment.",
  },
];

const seedGalleryIfEmpty = async () => {
  const existingCount = await Gallery.countDocuments();
  if (existingCount > 0) return;
  await Gallery.insertMany(DEFAULT_GALLERY_ITEMS);
};

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const headerIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || "").split(",")[0];

  return (
    headerIp?.trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
};

const serializeGalleryItem = (item, clientIp) => {
  const likedIps = Array.isArray(item.likedIps) ? item.likedIps.map(String) : [];

  return {
    ...item,
    likes: likedIps.length,
    likedByViewer: likedIps.includes(clientIp),
  };
};

export const listGalleryItems = async (_req, res) => {
  try {
    await seedGalleryIfEmpty();
    const clientIp = getClientIp(_req);
    const items = await Gallery.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      data: items.map((item) => serializeGalleryItem(item, clientIp)),
    });
  } catch (error) {
    console.error("listGalleryItems error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load gallery items",
    });
  }
};

export const toggleGalleryLike = async (req, res) => {
  try {
    await seedGalleryIfEmpty();

    const { id } = req.params;
    const galleryItem = await Gallery.findById(id);
    const clientIp = getClientIp(req);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    const likedIps = new Set((galleryItem.likedIps || []).map((value) => String(value)));
    const hasLiked = likedIps.has(clientIp);

    if (hasLiked) {
      likedIps.delete(clientIp);
    } else {
      likedIps.add(clientIp);
    }

    galleryItem.likedIps = Array.from(likedIps);
    galleryItem.likes = galleryItem.likedIps.length;
    await galleryItem.save();

    const updatedItem = galleryItem.toObject();

    res.status(200).json({
      success: true,
      message: "Gallery like updated",
      data: {
        ...updatedItem,
        likedByViewer: !hasLiked,
        viewerIp: clientIp,
      },
    });

    getSocketIO()?.emit("gallery-updated", {
      action: hasLiked ? "unliked" : "liked",
      message: `${galleryItem.title} like count updated`,
      item: {
        ...updatedItem,
        likedByViewer: !hasLiked,
      },
    });
  } catch (error) {
    console.error("toggleGalleryLike error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to update gallery like",
    });
  }
};
