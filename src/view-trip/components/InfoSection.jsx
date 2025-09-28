import React from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useImageFetch } from "@/hooks/useImageFetch";

function InfoSection({ trip }) {
  const destination = trip?.userSelection?.destination;
  const { image, loading } = useImageFetch(destination);

  return (
    <div>
      <div className="relative h-[340px] w-full rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <p className="text-gray-500">Loading image...</p>
          </div>
        ) : (
          <img
            src={image}
            alt={destination}
            className="h-full w-full object-fill"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-5">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{destination}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default InfoSection;
