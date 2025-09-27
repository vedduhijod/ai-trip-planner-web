import React from "react";
import PlaceCardItem from "./PlaceCardItem";


function PlacesToVisit({trip}) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="">
            <h2 className="font-medium text-lg mt-5 mb-3">Day {item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.places.map((place, index) => (
                <div className="">
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
