"use client";

import { useState } from "react";
import { SpotifyApi } from "@/types/spotify";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TopTracksProps {
  data: SpotifyApi.UsersTopTracksResponse | undefined;
  isLoading: boolean;
  itemsPerPage?: number;
}

const TopTracks = ({ data, isLoading, itemsPerPage = 12 }: TopTracksProps) => {
  const [api, setApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = () => {
    if (api) {
      setCurrentSlide(api.selectedScrollSnap());
    }
  };

  // Obliczanie maksymalnego slajdu
  const maxSlide = data?.items
    ? Math.ceil(data.items.slice(0, itemsPerPage).length / 3) - 1
    : 0;

  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-spotify-green"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Your Top Tracks</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => api?.scrollNext()}
                disabled={currentSlide >= maxSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              slidesToScroll: 2,
            }}
            onSelect={updateCurrentSlide}
            className="w-full"
          >
            <CarouselContent>
              {data?.items.slice(0, itemsPerPage).map((track) => (
                <CarouselItem
                  key={track.id}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/4"
                >
                  <div className="flex flex-col items-center p-2 h-full">
                    <div className="relative w-full aspect-square mb-3">
                      <Image
                        src={
                          track.album.images[0]?.url || "/placeholder-track.png"
                        }
                        alt={track.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="text-center w-full flex-grow">
                      <p className="font-medium text-white text-sm line-clamp-2">
                        {track.name}
                      </p>
                      <p className="font-medium text-white text-sm line-clamp-2">
                        {track.album.name}
                      </p>
                      <p className="text-xs text-spotify-light-gray line-clamp-1">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </>
      )}
    </div>
  );
};

export default TopTracks;
