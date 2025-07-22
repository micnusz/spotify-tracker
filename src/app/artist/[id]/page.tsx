"use server";

import { fetchArtist } from "@/hooks/useArtist";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ArtistClient from "./ArtistClient";

type ArtistServerProps = {
  params: {
    id: string;
  };
};

const ArtistServer = async ({ params }: ArtistServerProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchArtist(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistClient id={id} />
    </HydrationBoundary>
  );
};

export default ArtistServer;
