import { useState } from "react";
import { Heart } from "lucide-react";


function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="flex items-center "
    >
      <Heart
        className={`w-6 h-6 transition ${
          liked ? "fill-red-500 text-red-500" : "text-gray-500"
        }`}
      />
      
    </button>
  );
}

export default LikeButton;