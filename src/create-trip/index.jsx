// CreateTrip.jsx
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig"; 
import { useNavigate } from "react-router-dom";


const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
);
const aiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
});


function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  
  const destinations = [
    {
      _id: "1",
      place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
      description: "Paris, France",
    },
    {
      _id: "2",
      place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
      description: "New York, USA",
    },
    {
      _id: "3",
      place_id: "ChIJ51cu8IcbXWARiRtXIothAS4",
      description: "Tokyo, Japan",
    },
    {
      _id: "4",
      place_id: "ChIJRcbZaklDXz4RYlEphFBu5r0",
      description: "Dubai, UAE",
    },
    {
      _id: "5",
      place_id: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
      description: "Sydney, Australia",
    },
    {
      _id: "6",
      place_id: "ChIJcY7XbLQ4sjoRShmvpjUKN6s",
      description: "Goa, India",
    },
  ];

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => {
      console.error("Google login error:", error);
      toast("Google login failed");
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.budget) ||
      !formData?.destination ||
      !formData?.traveler
    ) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);
    try {
      const finalPrompt = AI_PROMPT.replace("{location}", formData.destination)
        .replace("{totalDays}", formData.noOfDays)
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget);

      console.log("🔹 Final Prompt:", finalPrompt);

      const result = await aiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
        },
      });

      // defensive extraction of text
      let responseText = "";
      if (
        result?.response?.text &&
        typeof result.response.text === "function"
      ) {
        responseText = result.response.text().trim();
      } else if (typeof result === "string") {
        responseText = result.trim();
      } else if (result?.response) {
        responseText = String(result.response).trim();
      }

      console.log("📝 Raw Response:", responseText);
      if (!responseText) throw new Error("Empty response from Gemini");

      // extract fenced JSON if present
      const fenced = responseText.match(/```json([\s\S]*?)```/);
      if (fenced) responseText = fenced[1].trim();

      // handle concatenated JSON objects
      const parts = responseText.split(/(?<=\})\s*(?=\{)/g);

      // repair and parse
      let jsonData;
      try {
        const repaired = jsonrepair(parts[0]);
        jsonData = JSON.parse(repaired);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        console.log("Raw Response:", responseText);
        toast("Trip data broken — try again.");
        return;
      }

      const normalized = {
        hotels: jsonData.hotels || jsonData.hotel_options || [],
        itinerary: jsonData.itinerary || jsonData.day_plan || [],
      };

      // LOG to console (per your request) and save
      console.log("✅ Normalized Trip Data:", normalized);

      // Save to Firestore (pass normalized directly)
      await SaveAiTrip(normalized);

      toast("Trip Generated");
    } catch (err) {
      console.error("Error generating trip:", err);
      toast("Failed to generate trip");
    } finally {
      setLoading(false);
    }
  };

  // Save function — does not toggle global loading (handled above)
  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const docId = Date.now().toString();

      // Ensure TripData and formData are JSON-safe
      const cleanTripData = JSON.parse(JSON.stringify(TripData));
      const cleanFormData = JSON.parse(JSON.stringify(formData));

      await setDoc(doc(db, "AITrip", docId), {
        userSelection: cleanFormData,
        tripData: cleanTripData, // store as object, not string
        userEmail: user?.email || null,
        id: docId,
        createdAt: new Date().toISOString(),
      });

      console.log("Saved trip to Firestore:", docId);
      navigate(`/view-trip/${docId}`);
    } catch (err) {
      console.error("Failed saving trip to Firestore:", err);
      toast("Could not save trip to DB");
    }

  
  };


  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip(); 
    } catch (err) {
      console.error("Failed to fetch Google profile:", err);
      toast("Google auth failed");
    }
  };

  return (
    <div className="relative px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40 mt-10">
  {loading && (
    <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
      <AiOutlineLoading3Quarters className="animate-spin text-white h-16 w-16" />
      <p className="text-white mt-4 text-lg font-semibold">
        Generating your trip...
      </p>
    </div>
  )}

  <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl">
    Tell us your travel preferences🏕️🌴
  </h2>
  <p className="mt-3 text-gray-500 text-lg sm:text-xl">
    Provide a few details and we'll generate an itinerary.
  </p>

  <div className="mt-10 flex flex-col gap-10">
    {/* Destination */}
    <div>
      <h2 className="text-xl sm:text-2xl my-3 font-medium">Destination</h2>
      <select
        value={formData.destination || ""}
        onChange={(e) => handleInputChange("destination", e.target.value)}
        className="border rounded-lg px-4 py-2 w-full max-w-md sm:max-w-full"
      >
        <option value="">-- Select a destination --</option>
        {destinations.map((c) => (
          <option key={c._id} value={c.description}>
            {c.description}
          </option>
        ))}
      </select>
    </div>

    {/* Number of days */}
    <div>
      <h2 className="text-xl sm:text-2xl my-3 font-medium">How many days?</h2>
      <Input
        placeholder="Ex. 3"
        type="number"
        className="w-full max-w-md sm:max-w-full"
        onChange={(e) => handleInputChange("noOfDays", e.target.value)}
      />
    </div>

    {/* Budget */}
    <div>
      <h2 className="text-xl sm:text-2xl my-3 font-medium">Budget</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {SelectBudgetOptions.map((item, i) => (
          <div
            key={i}
            onClick={() => handleInputChange("budget", item.title)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
              formData?.budget === item.title ? "shadow-lg border-black" : ""
            }`}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg sm:text-xl">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.desc}</h2>
          </div>
        ))}
      </div>
    </div>

    {/* Traveler Type */}
    <div>
      <h2 className="text-xl sm:text-2xl my-3 font-medium">
        Who are you traveling with?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-5">
        {SelectTravelList.map((item, i) => (
          <div
            key={i}
            onClick={() => handleInputChange("traveler", item.people)}
            className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
              formData?.traveler === item.people ? "shadow-lg border-black" : ""
            }`}
          >
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="font-bold text-lg sm:text-xl">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.desc}</h2>
          </div>
        ))}
      </div>
    </div>

    {/* Generate Button */}
    <div className="my-10 justify-center flex">
      <Button onClick={OnGenerateTrip} disabled={loading} className="w-full max-w-xs sm:max-w-sm">
        {loading ? <AiOutlineLoading3Quarters className="animate-spin h-6 w-6" /> : "Generate Trip"}
      </Button>
    </div>
  </div>

  {/* Google Sign-In Dialog */}
  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
    <DialogContent className="sm:max-w-sm w-full">
      <DialogHeader>
        <DialogDescription className="flex flex-col items-center gap-4">
          <img src="src/assets/logo.svg" alt="logo" className="w-24 sm:w-28" />
          <h2 className="font-bold text-lg">Sign in with Google</h2>
          <p className="text-center text-gray-600">
            Sign in to the App with Google authentication securely
          </p>
          <Button
            onClick={() => login()}
            className="mt-5 w-full flex gap-4 items-center justify-center px-4 py-2"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In with Google
          </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</div>
  )
}

export default CreateTrip;
