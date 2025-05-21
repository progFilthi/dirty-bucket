import Image from "next/image";
import React from "react";
import beatData from "@/lib/beatData";

export default function BeatCard() {
  return (
    <div className="pt-4 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {beatData.map((beat) => (
          <div
            key={beat.id}
            className="flex flex-row gap-4 border border-neutral-300 bg-neutral-200 p-4 rounded-lg hover:shadow-md shadow-black transition-shadow duration-200 ease-in-out"
          >
            <Image
              src="/gang8.jpeg"
              alt="beat cover"
              width={120}
              height={120}
              className="rounded-md object-cover shrink-0"
            />
            <div className="flex flex-col flex-1 justify-center text-center">
              <h1 className="text-md font-semibold text-neutral-900">
                {beat.title.toUpperCase()}
              </h1>
              <div className="flex gap-1 items-center text-sm text-neutral-500 mt-1 justify-center">
                <p>{beat.key}</p>
                <span className="text-xl leading-none">·</span>
                <p>{beat.bpm} BPM</p>
              </div>
              <button
                type="button"
                className="bg-neutral-500 text-white text-sm font-medium mt-8 px-4 py-2 rounded-md shadow transition-all duration-150 cursor-pointer active:opacity-80"
              >
                ${beat.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
