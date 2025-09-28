import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center gap-6 px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-10">
        <span className="text-[#f5ab51]">
          Discover Your Next Adventure with AI:{" "}
        </span>
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center max-w-3xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>

      <Link to="/create-trip">
        <Button className="px-6 py-3 mt-4">Get Started, It's free</Button>
      </Link>

      <img
        src="/landing.png"
        alt="Landing"
        className="mt-6 w-full max-w-3xl object-contain"
      />
    </div>
  );
}

export default Hero;
