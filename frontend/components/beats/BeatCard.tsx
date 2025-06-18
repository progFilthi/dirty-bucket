"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MoreVertical, Music, PauseIcon, PlayIcon } from "lucide-react";
import { formatTitle } from "@/utils/formTitles";
import { useCartStore } from "@/store/cartStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useRef } from "react"; // make sure this is imported at the top

// Inside the component

interface Beat {
  _id: string;
  title: string;
  coverUrl: string;
  audioUrl: string;
  key: string;
  bpm: number;
  price: number;
}

export default function BeatList() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingBeatId, setPlayingBeatId] = useState<string | null>(null);
  const [beats, setBeats] = useState<Beat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredBeat, setHoveredBeat] = useState<string | null>(null);
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
      price: Number(beat.price),
      cover: beat.coverUrl,
      audio: beat.audioUrl,
      bpm: beat.bpm,
      key: beat.key,
      quantity: 1,
    });
    toast.success(`"${beat.title}" added to cart`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden border-0 bg-neutral-50 dark:bg-neutral-900 rounded-xl"
        >
          <CardContent className="p-0">
            <Skeleton className="aspect-square w-full rounded-t-xl" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-40 rounded-full" />
                <Skeleton className="h-5 w-40 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">
            Browse Beats
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Discover the perfect sound for your next track
          </p>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-16">
          <Music className="mx-auto h-16 w-16 text-neutral-300 dark:text-neutral-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            Something went wrong
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-white rounded-full px-6 py-3 font-medium"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (beats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-16">
          <Music className="mx-auto h-16 w-16 text-neutral-300 dark:text-neutral-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-white">
            No beats available
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            Check back later for new releases
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">
          Browse Beats
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {beats.length} {beats.length === 1 ? "beat" : "beats"} available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {beats.map((beat) => (
          <Card
            key={beat._id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-neutral-50 dark:bg-neutral-900 rounded-b-xl flex flex-col h-full w-full -py-2 group"
            onMouseEnter={() => setHoveredBeat(beat._id)}
            onMouseLeave={() => setHoveredBeat(null)}
          >
            {/* Image Section */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-b-xl">
              <Image
                src={beat.coverUrl}
                alt={`${beat.title} beat cover`}
                width={230}
                height={230}
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
                priority={false}
              />

              {/* Play Button Overlay */}
              <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredBeat === beat._id ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full bg-white hover:bg-white/90 text-black shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playingBeatId === beat._id) {
                      audioRef.current?.pause();
                      setPlayingBeatId(null);
                    } else {
                      if (audioRef.current) {
                        audioRef.current.src = beat.audioUrl;
                        audioRef.current.play();
                        setPlayingBeatId(beat._id);
                      }
                    }
                  }}
                >
                  {playingBeatId === beat._id ? (
                    <PauseIcon className="h-5 w-5" fill="currentColor" />
                  ) : (
                    <PlayIcon className="h-5 w-5 ml-1" fill="currentColor" />
                  )}
                </Button>

                {/* Only one global audio element */}
                <audio
                  ref={audioRef}
                  onEnded={() => setPlayingBeatId(null)}
                  className="hidden"
                />
              </div>

              {/* Dropdown menu - subtle and minimal */}
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-black/10 hover:bg-black/20 text-white border-0 backdrop-blur-sm rounded-full"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                  >
                    <DropdownMenuItem className="rounded-md focus:bg-neutral-100 dark:focus:bg-neutral-800">
                      Download Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-md focus:bg-neutral-100 dark:focus:bg-neutral-800">
                      Share Beat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Content Section */}
            <CardContent className="px-2 flex-1 flex flex-col justify-center">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-neutral-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                        {formatTitle(beat.title)}
                      </h3>
                    </div>
                    <div>
                      <p>${Number(beat.price).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex justify-start items-start gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-sm px-2.5 py-0.5"
                    >
                      {beat.key}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-sm px-2.5 py-0.5"
                    >
                      {beat.bpm} BPM
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 py-4 border-t border-neutral-200 dark:border-neutral-800">
                <Button
                  onClick={() => handleAddToCart(beat)}
                  className="w-full font-medium h-11 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-white transition-all active:scale-[0.98] cursor-pointer"
                  size="default"
                >
                  <ShoppingBagIcon className="h-4 w-4 mr-2" />
                  <p>Add To Cart</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
