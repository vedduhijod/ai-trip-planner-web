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
      <div className="border rounded-xl p-3 flex flex-col sm:flex-row gap-3 sm:gap-5 hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer h-full">
        <img
          src={image}
          alt={place.placeName}
          className="w-full sm:w-[130px] h-44 sm:h-[130px] rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-lg sm:text-xl">{place.placeName}</h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            {place.placeDetails}
          </p>
          <h2 className="mt-2 text-orange-600 text-sm sm:text-base">
            ⏱️ {place.timeToVisit}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
