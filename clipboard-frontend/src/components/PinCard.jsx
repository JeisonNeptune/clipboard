import { useState } from "react";

const PinCard = ({ pin }) => {
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
      const baseEmbed = pin.contentUrl.includes("youtube.com")
        ? pin.contentUrl.replace("watch?v=", "embed/")
        : pin.contentUrl.includes("youtu.be")
        ? `https://www.youtube.com/embed/${
            pin.contentUrl.split("/").pop().split("?")[0]
          }`
        : pin.contentUrl;

      const embedUrl = hovered
        ? `${baseEmbed}?autoplay=1&mute=1`
        : `${baseEmbed}?autoplay=0`;

        return (
            <div className="w-full aspect-video rounded overflow-hidden">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title={pin.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
          
    }

    return <p className="text-sm text-red-500">Unknown content type</p>;
  };

  return (
    <div
    className={"w-full h-full min-h-[300px] bg-white rounded-2xl p-6 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white rounded-2xl p-4 shadow-lg w-full h-full">
        <h3 className="font-semibold text-xl text-gray-800">{pin.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{pin.note}</p>

        <div className="mt-3">{renderContent()}</div>

        <div className="flex flex-wrap gap-2 pt-3">
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
    </div>
  );
};

export default PinCard;
