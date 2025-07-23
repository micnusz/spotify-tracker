"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SpotifyApi } from "@/types/spotify";
import Image from "next/image";
import { ReactNode } from "react";

type TrackPreviewDialogProps = {
  children: ReactNode;
  data: SpotifyApi.TrackObjectFull;
};

const TrackPreviewDialog = ({ children, data }: TrackPreviewDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[50%] rounded-lg bg-gradient-to-b from-background/90 to-muted/50 backdrop-blur-sm border border-muted/50">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex flex-col gap-y-1">
              <div className="flex flex-row gap-x-4 items-center">
                <div className="relative w-[8rem] h-[8rem] min-w-[6rem]">
                  <Image
                    src={data.album.images[0]?.url || "/placeholder-track.png"}
                    alt={data.name}
                    fill
                    className="rounded-md object-cover shadow-xl"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <h1 className="text-xl font-bold line-clamp-2">
                    {data.name}
                  </h1>
                  <div className="flex flex-row gap-x-1 flex-wrap">
                    {data.artists.map((author, index) => (
                      <span
                        key={author.id}
                        className="text-sm font-medium text-foreground/80"
                      >
                        {author.name}
                        {index < data.artists.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row gap-x-1 flex-wrap">
                    <span>{data.album.name}</span>
                    <span>{data.duration_ms}</span>
                    <span>{data.track_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Odtwórz
          </button>
          <button className="w-full py-2 px-4 border border-muted-foreground/20 rounded-md hover:bg-muted/50">
            Dodaj do playlisty
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackPreviewDialog;
