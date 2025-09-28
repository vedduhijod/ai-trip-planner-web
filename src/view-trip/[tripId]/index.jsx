import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrip", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTripData(docSnap.data());
      } else {
        toast("Trip not found");
        setTripData(null);
      }
    } catch (err) {
      console.error("Error fetching trip:", err);
      toast("Failed to fetch trip");
      setTripData(null);
    }
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-32 xl:px-44 py-10 flex flex-col gap-10">
      {/* Info Section */}
      {tripData && <InfoSection trip={tripData} />}

      {/* Recommended Hotels */}
      {tripData?.tripData?.hotels?.length > 0 && <Hotels trip={tripData} />}

      {/* Daily Plan */}
      {tripData?.tripData?.itinerary?.length > 0 && (
        <PlacesToVisit trip={tripData} />
      )}

      {/* Footer */}
      <Footer trip={tripData} />
    </div>
  );
}

export default ViewTrip;
