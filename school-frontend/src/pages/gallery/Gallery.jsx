import React, { useState } from "react";
import Heart from "../../components/Heart";
import { ImCancelCircle } from "react-icons/im";

const Gallery = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: "https://imgs.search.brave.com/DsKFhvlYheX7q3rktNialHXKfW8nRKC2XB21E7mVapQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9kZXNr/LTY0NTk0MS5qcGc",
      title: "Annual Function",
      description: "Students performing cultural dance.",
      likes: 0,
      comments: []
    },
    {
      id: 2,
      src: "https://imgs.search.brave.com/N0ezdGED2AFhtZcPfe1eb9mHvKHMq9NuyyyLVci4sBg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/d2lraWhvdy5jb20v/aW1hZ2VzL3RodW1i/LzUvNTMvRnVubnkt/UmFuZG9tLUl0ZW1z/LXRvLUJyaW5nLXRv/LVNjaG9vbC1TdGVw/LTEuanBnL3Y0LTQ2/MHB4LUZ1bm55LVJh/bmRvbS1JdGVtcy10/by1CcmluZy10by1T/Y2hvb2wtU3RlcC0x/LmpwZw",
      title: "Sports Day",
      description: "100m race competition moment.",
      likes: 0,
      comments: []
    }
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  // ❤️ Like
  const handleLike = (id) => {
    setImages(
      images.map((img) => {
        if (img.id === id) {
          return {
            ...img,
            liked: !img.liked,
            likes: img.liked ? img.likes - 1 : img.likes + 1
          };
        }
        return img;
      })
    );
  };

  return (
    <div className="p-6 pt-28">
      <h2 className="text-2xl font-bold mb-6 text-center">School Gallery</h2>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="border rounded-xl shadow p-3">

            <img
              src={img.src}
              alt={img.title}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedImage(img)}
            />

            <h3 className="font-bold mt-2">{img.title}</h3>
            <p className="text-sm text-gray-600">{img.description}</p>

            <button
              onClick={() => handleLike(img.id)}
              className="mt-2 ml-2 text-blue-600 font-semibold flex gap-2"
            >
              <Heart /> {img.likes}
            </button>
          </div>
        ))}
      </div>

      {/* FULL SCREEN IMAGE MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4">

          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            <ImCancelCircle />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            className="max-h-[55vh] max-w-[95vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;