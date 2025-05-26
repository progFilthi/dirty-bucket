"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Beat {
  _id: string;
  title: string;
  coverUrl: string;
  key: string;
  bpm: number;
  price: number;
}

export default function BeatCard() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/beats`
        );
        setBeats(res.data);
      } catch (err) {
        setError("Failed to fetch beats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBeats();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-neutral-500">Loading beats...</div>
    );
  }

  if (error) {
    return <div className="py-12 text-center text-red-500">{error}</div>;
  }

  if (beats.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        No beats uploaded yet.
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {beats.map((beat) => (
          <div
            key={beat._id}
            className="rounded-2xl p-6 cursor-pointer flex justify-between gap-10 bg-white border border-neutral-300 w-80 h-44 shadow-lg hover:shadow-neutral-200/40 hover:-translate-y-0.5 transition-all duration-300 ease-out"
          >
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <Image
                src={beat.coverUrl}
                alt={`${beat.title} beat cover`}
                width={120}
                height={120}
                className="w-full aspect-square rounded-xl object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-2 text-center flex-1">
              <h3 className="font-medium text-base text-neutral-900 tracking-tight leading-tight">
                {beat.title.toUpperCase()}
              </h3>
              <p className="text-xs text-neutral-500 font-medium">
                {beat.key} • {beat.bpm} BPM
              </p>
              <button
                type="button"
                className="font-base text-sm mt-4 border border-neutral-200 text-neutral-900 rounded-md py-2.5 px-5 transition-colors duration-200 active:scale-95 transform cursor-pointer shadow-sm"
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
