import { useEffect, useMemo, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { Heart as HeartIcon } from "lucide-react";
import {
  readGallery,
  toggleGalleryLike,
} from "../../utils/galleryApi";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError("");
      const items = await readGallery();
      setImages(
        items.map((item) => ({
          ...item,
          liked: Boolean(item.likedByViewer),
        }))
      );
    } catch (fetchError) {
      console.error("Failed to load gallery:", fetchError);
      setError("Unable to load gallery right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const handleRefresh = () => {
      if (active) loadGallery();
    };

    loadGallery();
    window.addEventListener("gallery-updated", handleRefresh);

    return () => {
      active = false;
      window.removeEventListener("gallery-updated", handleRefresh);
    };
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const freshImage = images.find((img) => img._id === selectedImage._id);
    if (freshImage) {
      setSelectedImage(freshImage);
    }
  }, [images, selectedImage]);

  const handleLike = async (item) => {
    let nextImage = null;

    setImages((current) =>
      current.map((img) => {
        if (img._id !== item._id) return img;

        nextImage = {
          ...img,
          liked: !img.liked,
          likes: Math.max(0, (img.likes || 0) + (img.liked ? -1 : 1)),
        };

        return nextImage;
      })
    );

    if (nextImage && selectedImage?._id === nextImage._id) {
      setSelectedImage(nextImage);
    }

    try {
      await toggleGalleryLike(item._id);
    } catch (likeError) {
      console.error("Failed to update gallery like:", likeError);
      loadGallery();
    }
  };

  const sortedImages = useMemo(() => images, [images]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-0">
      <h2 className="text-center text-2xl font-bold sm:text-3xl">School Gallery</h2>

      {loading ? (
        <div className="rounded-2xl border border-stone-100 bg-white/10 p-6 text-center shadow backdrop-blur-md">
          Loading gallery...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700 shadow">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {sortedImages.map((img) => (
            <div
              key={img._id || img.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/75 p-3 shadow-lg backdrop-blur-sm"
            >
              <img
                src={img.src}
                alt={img.title}
                className="h-48 w-full cursor-pointer rounded-xl object-cover transition duration-300 hover:scale-[1.03]"
                onClick={() => setSelectedImage(img)}
              />

              <h3 className="mt-3 font-bold text-slate-800">{img.title}</h3>
              <p className="text-sm text-slate-600">{img.description}</p>

              <button
                onClick={() => handleLike(img)}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 font-semibold text-blue-600 transition hover:bg-blue-100 hover:text-blue-700"
                type="button"
                aria-pressed={Boolean(img.liked)}
              >
                <HeartIcon
                  className={`h-5 w-5 ${img.liked ? "fill-red-500 text-red-500" : "text-blue-600"}`}
                />
                <span>{img.likes || 0}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
              onClick={() => setSelectedImage(null)}
              type="button"
              aria-label="Close image preview"
            >
              <ImCancelCircle size={22} />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[75vh] w-full object-contain"
            />

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/80 px-4 py-3 text-white">
              <div>
                <h3 className="font-semibold">{selectedImage.title}</h3>
                <p className="text-sm text-white/70">{selectedImage.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleLike(selectedImage)}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold text-white transition hover:bg-white/20"
                aria-pressed={Boolean(selectedImage.liked)}
              >
                <HeartIcon
                  className={`h-5 w-5 ${
                    selectedImage.liked ? "fill-red-500 text-red-500" : "text-white"
                  }`}
                />
                <span>{selectedImage.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
