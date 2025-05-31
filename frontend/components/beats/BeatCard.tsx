"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { formatTitle } from "@/utils/formTitles";
import { useCartStore } from "@/store/cartStore";

interface Beat {
  _id: string;
  title: string;
  coverUrl: string;
  key: string;
  bpm: number;
  price: number;
}

export default function BeatList() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const addItem = useCartStore((state) => state.addItem);

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

  const handleAddToCart = (beat: Beat) => {
    addItem({
      id: beat._id,
      title: beat.title,
      price: beat.price,
      cover: beat.coverUrl,
      audio: "",
      quantity: 1,
    });
    toast.success(`"${beat.title}" added to cart`);
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {beats.map((beat) => (
          <div
            key={beat._id}
            className="rounded-lg flex flex-col justify-between gap-4 bg-white border border-neutral-300 w-56 h-82 shadow-sm hover:shadow-neutral-200/40 hover:-translate-y-0.5 transition-all duration-300 ease-out"
          >
            <div className="flex-shrink-0">
              <Image
                src={beat.coverUrl}
                alt={`${beat.title} beat cover`}
                width={100}
                height={100}
                className="w-full h-46 object-cover object-top rounded-md"
              />
            </div>

            <div className="flex flex-col justify-center space-y-2 px-4 relative">
              <h3 className="font-black text-sm text-nowrap overflow-hidden text-ellipsis">
                {formatTitle(beat.title)}
              </h3>
              <p className="text-xs text-neutral-500">
                {beat.key} • {beat.bpm} Bpm
              </p>
              <div className="flex items-center justify-center space-x-2 relative">
                <button
                  onClick={() => handleAddToCart(beat)}
                  type="button"
                  className="text-sm my-2 text-white bg-black rounded-md w-full h-8 transition-all duration-300 active:scale-85 transform cursor-pointer shadow-sm"
                >
                  $ {beat.price}
                </button>
              </div>
              <EllipsisVerticalIcon className="h-4 absolute top-1 right-3 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
