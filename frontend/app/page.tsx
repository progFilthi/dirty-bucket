import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white mt-10">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
        Are you tired of overpriced junk beats stores?
      </h1>

      <p className="text-lg md:text-xl text-gray-700 mt-6 max-w-xl">
        DirtyBucket is your digital home for selling beats. Keep your profits.
        Build your brand. Take back control.
      </p>

      <p className="text-sm text-gray-500 mt-2">No middlemen. No BS.</p>

      <button
        type="button"
        className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg cursor-pointer"
      >
        Upload Your First Beat
      </button>

      {/* Optional: Add trust elements */}
      <div className="mt-8 text-sm text-gray-400">
        Trusted by 1,000+ indie producers.
      </div>
    </div>
  );
}
