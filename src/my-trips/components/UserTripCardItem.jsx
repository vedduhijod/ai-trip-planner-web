import { useImageFetch } from "@/hooks/useImageFetch";
import React from "react";
import { Link } from "react-router-dom";
function UserTripCardItem({trip}) {
  const destination = trip?.userSelection?.destination;
  const { image, loading } = useImageFetch(destination);
  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <div className="relative h-[220px] w-full rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full bg-gray-200">
              <p className="text-gray-500">Loading image...</p>
            </div>
          ) : (
            <img
              src={image}
              alt={destination}
              className="w-full h-full object-cover rounded-xl"
            />
          )}
        </div>
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.destination}
          </h2>
          <h2 className="text-gray-500 text-sm">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
