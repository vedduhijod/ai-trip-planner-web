import { db } from "@/service/firebaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import UserTripCardItem from "./components/UserTripCardItem";

function Mytrips() {
  
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    GetUserTrips();
  }, []);
  
/** 
 * User to get All User Trips
 * @returns 
*/
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    setUserTrips([]);
    const q = query(
      collection(db, "AITrip"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
  }

  return (
    <div className="sm:p-10 md:px-32 lg:px-56 xl:px-72 px-5">
      <h1 className="text-3xl font-bold">My Trips</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-5 gap-7 object-cover rounded-xl">
        {userTrips?.length>0?userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index}/>
        ))
      :
      [1,2,3,4,5,6].map((item, index)=>(
        <div key={index} className="w-full h-[220px] bg-slate-200 animate-pulse rounded-xl"></div>
      ))}
      </div>
    </div>
  );
}
export default Mytrips;
