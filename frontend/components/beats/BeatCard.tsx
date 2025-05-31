"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MoreVertical, Play, ShoppingCart, Music } from "lucide-react";
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
      audio: "",
      bpm: beat.bpm,
      key: beat.key,
      quantity: 1,
    });
    toast.success(`"${beat.title}" added to cart`);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="p-0">
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-9 w-full" />
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Browse Beats
          </h1>
          <p className="text-muted-foreground">
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
          <Music className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (beats.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center py-16">
          <Music className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No beats available</h2>
          <p className="text-muted-foreground">
            Check back later for new releases
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Beats</h1>
        <p className="text-muted-foreground">
          {beats.length} {beats.length === 1 ? "beat" : "beats"} available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {beats.map((beat) => (
          <Card
            key={beat._id}
            className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-md flex flex-col h-full"
            onMouseEnter={() => setHoveredBeat(beat._id)}
            onMouseLeave={() => setHoveredBeat(null)}
          >
            {/* Image Section - Stuck to top */}
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 ">
              <Image
                src={beat.coverUrl}
                alt={`${beat.title} beat cover`}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />

              {/* Overlay with play button */}
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredBeat === beat._id ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-white/90 hover:bg-white text-black hover:text-black shadow-lg"
                >
                  <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                </Button>
              </div>

              {/* Dropdown menu */}
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-black/20 hover:bg-black/40 text-white border-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                    <DropdownMenuItem>Download Preview</DropdownMenuItem>
                    <DropdownMenuItem>Share Beat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Content Section - Flexible space below */}
            <CardContent className="px-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-2">
                    {formatTitle(beat.title)}
                  </h3>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-muted-foreground/30"
                    >
                      {beat.key}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium border-muted-foreground/30"
                    >
                      {beat.bpm} BPM
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-muted/20">
                <Button
                  onClick={() => handleAddToCart(beat)}
                  className="w-full font-bold group/button h-11"
                  size="default"
                >
                  <ShoppingCart className="h-4 w-4  mr-2 transition-transform group-hover/button:scale-110" />
                  ${Number(beat.price).toFixed(2)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
