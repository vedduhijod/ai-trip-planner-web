import React, { useEffect, useState} from "react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import InfoSection from "../components/InfoSection";
import { Hotel } from "lucide-react";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrip", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripData(docSnap.data());
    } else {
      console.log("No such document!");
      toast("Trip not found");
      setTripData([]);
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/*Information Section*/}
      <InfoSection trip={tripData} />

      {/*Recommended Hotels*/}
      <Hotels trip={tripData} />

      {/*Daily Plan*/}
      <PlacesToVisit trip={tripData} />

      {/*Footer*/}
      <Footer trip={tripData} />
    </div>
  );
}
export default Viewtrip;
