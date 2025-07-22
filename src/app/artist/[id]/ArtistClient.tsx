"use client";

import Spinner from "@/components/Spinner";
import { useArtist } from "@/hooks/useArtist";

type ArtistClientProps = {
  id: string;
};

const ArtistClient = ({ id }: ArtistClientProps) => {
  const { data: ArtistData, error, isLoading } = useArtist(id);

  if (isLoading)
    return (
      <span>
        <Spinner />
      </span>
    );
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <h1>{ArtistData?.name}</h1>
    </div>
  );
};

export default ArtistClient;
