"use client";
import formatDuration from "@/app/modules/format-duration";
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
import { CopyButton } from "./CopyButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import formatReleaseDate from "@/app/modules/format-release-date";

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
                <div className="relative w-[7rem] h-[7rem] min-w-[6rem]">
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
                      <span key={author.id} className="text-sm font-medium">
                        {author.name}
                        {index < data.artists.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row gap-x-1 flex-wrap items-center text-xs font-medium text-foreground/70">
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <span className="mr-1">•</span>
                        {formatReleaseDate(data.album.release_date)}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{data.album.release_date}</p>
                      </TooltipContent>
                    </Tooltip>

                    <span className="flex items-center">
                      <span className="mx-1">•</span>
                      {formatDuration(data.duration_ms)}
                    </span>

                    <span className="flex items-center">
                      <span className="mx-1">•</span>
                      {data.album.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div>
          <div>
            <CopyButton
              textToCopy={data.external_urls.spotify}
              variant="outline"
              size="default"
              title="Copy Link"
            />
          </div>
          <div>
            <h1>Track info:</h1>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackPreviewDialog;
