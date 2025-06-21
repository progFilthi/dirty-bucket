import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold mb-4">
        Are you tired of overpriced junk?
      </h1>
      <div className="pb-8 opacity-75">
        <p className="text-xl text-center">This is your marketplace</p>
        <p className="text-2xl text-center">And a digital home to sell</p>
        <p className="text-3xl">Your beats & keep your money!</p>
      </div>
      <button
        type="button"
        className="bg-green-500 text-white p-2 w-64 md:w-32 md:rounded-sm rounded-lg cursor-pointer"
      >
        Try it Out!
      </button>
    </div>
  );
}
