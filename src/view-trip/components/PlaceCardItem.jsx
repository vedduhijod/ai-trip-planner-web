import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PlaceCardItem({ place }) {
  const [image, setImage] = useState("/placeholder.jpeg");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get("https://api.unsplash.com/search/photos", {
          params: { query: place.placeName, per_page: 1 },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
          },
        });
        setImage(res.data.results[0]?.urls?.regular || "/placeholder.jpeg");
      } catch {
        setImage("/placeholder.jpeg");
      }
    };
    fetchImage();
  }, [place]);

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer h-full">
        <img
          src={image}
          alt={place.placeName}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2 text-orange-600 text-sm">⏱️ {place.timeToVisit}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
