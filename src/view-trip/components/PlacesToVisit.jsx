import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl sm:text-2xl">Places to Visit</h2>
      <div className="flex flex-col gap-10">
        {trip.tripData?.itinerary.map((item) => (
          <div key={item.day}>
            <h2 className="font-medium text-lg sm:text-xl mt-2 mb-3">
              Day {item.day}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {item.places.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
