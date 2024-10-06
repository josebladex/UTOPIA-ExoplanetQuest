import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";
import React from "react";
export function Hero() {
  return (
    <div className="w-full mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h1 className="text-white text-2xl md:text-6xl font-bold text-center">
          UTOPIA Exoplanet Quest
        </h1>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          UTOPIA Exoplanet Quest is a NASA Apps Challenge project designed to
          develop an app that visualizes potential observational paths for the
          future Habitable Worlds Observatory (HWO). By determining which
          currently known exoplanets are observable, the app aims to identify
          and prioritize the most interesting exoplanetary targets for HWO based
          on their potential for characterization.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
  
          <Link
            href="/archive"
            className="bg-green-500 text-white text-sm md:text-xl font-bold py-2 px-4 rounded hover:bg-green-600 transition"
          >
            View Exoplanet Archive
          </Link>
        </div>
      </Vortex>
    </div>
  );
}
