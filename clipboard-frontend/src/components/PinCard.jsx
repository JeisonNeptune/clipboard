import { useState } from "react";
import axios from "axios";

const PinCard = ({ pin, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  const renderContent = () => {
    if (pin.type === "image") {
      return (
        <img
          src={pin.contentUrl}
          alt={pin.title}
          className="rounded-xl w-full h-auto max-h-[400px] object-cover"
        />
      );
    }

    if (pin.type === "clip" || pin.type === "song") {
      const isSpotify = pin.contentUrl.includes("open.spotify.com");
      const embedUrl = isSpotify
        ? pin.contentUrl.replace("open.spotify.com", "open.spotify.com/embed")
        : pin.contentUrl.includes("youtube.com")
        ? pin.contentUrl.replace("watch?v=", "embed/")
        : pin.contentUrl.includes("youtu.be")
        ? `https://www.youtube.com/embed/${pin.contentUrl.split("/").pop().split("?")[0]}`
        : pin.contentUrl;

      return isSpotify ? (
        <iframe
          src={embedUrl}
          className="w-full h-[152px] rounded-xl"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Player"
        ></iframe>
      ) : (
        <div className="w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`${embedUrl}?autoplay=0`}
            title={pin.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return <p className="text-sm text-red-500">Unknown content type</p>;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/pins/${pin._id}`);
      if (onDelete) onDelete(pin._id); // 👈 update UI
    } catch (err) {
      console.error("Failed to delete pin", err);
    }
  };

  return (
    <div
      className={`w-full h-full bg-white rounded-2xl p-5 shadow-md transition-all duration-300 ease-in-out transform relative ${
        hovered ? "scale-105 shadow-xl z-20" : "scale-100"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full text-xs"
      >
        ✕
      </button>

      {/* Content */}
      <h3 className="font-semibold text-xl text-gray-800">{pin.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{pin.note}</p>

      <div className="mt-4">{renderContent()}</div>

      <div className="flex flex-wrap gap-2 pt-4">
        {pin.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs"
          >
            
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PinCard;
