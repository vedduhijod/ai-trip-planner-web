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
    <div>
      <h2 className="font-bold text-xl mb-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
            target="_blank"
          >
            <div className="border rounded-xl gap-3 mt-2 p-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer hover:rounded-xl">
              <img
                src={hotelImages[hotel.hotelName] || "/placeholder.jpeg"}
                alt={hotel.hotelName}
                className="rounded-xl w-full h-40 object-cover"
              />
              <div className="flex flex-col gap-1 mt-2">
                <h2 className="font-medium">{hotel.hotelName}</h2>
                <h2 className="text-xs text-gray-500">
                  📍 {hotel.hotelAddress}
                </h2>
                <h2 className="text-sm">💰 {hotel.price}</h2>
                <h2 className="text-sm">⭐ {hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
