import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    const fetchHotelImages = async () => {
      const images = {};
      for (const hotel of trip?.tripData?.hotels || []) {
        try {
          const res = await axios.get(
            "https://api.unsplash.com/search/photos",
            {
              params: {
                query: `${hotel.hotelName}, ${hotel.hotelAddress}`,
                per_page: 1,
              },
              headers: {
                Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
              },
            }
          );
          images[hotel.hotelName] =
            res.data.results[0]?.urls?.regular || "/placeholder.jpeg";
        } catch {
          images[hotel.hotelName] = "/placeholder.jpeg";
        }
      }
      setHotelImages(images);
    };

    fetchHotelImages();
  }, [trip]);

  return (
    <div className="-mt-5">
      <h2 className="font-bold text-xl sm:text-2xl mb-5">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
            target="_blank"
          >
            <div className="border rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer">
              <img
                src={hotelImages[hotel.hotelName] || "/placeholder.jpeg"}
                alt={hotel.hotelName}
                className="w-full h-44 sm:h-48 md:h-52 object-cover"
              />
              <div className="p-3 flex flex-col gap-1">
                <h2 className="font-medium text-sm sm:text-base">
                  {hotel.hotelName}
                </h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  📍 {hotel.hotelAddress}
                </h2>
                <h2 className="text-sm sm:text-base">💰 {hotel.price}</h2>
                <h2 className="text-sm sm:text-base">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
