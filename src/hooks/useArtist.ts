import { Artist } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export async function fetchArtist(id: string): Promise<Artist> {
  const res = await fetch(`/api/artist?id=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch artist");
  return res.json();
}

export function useArtist(id: string) {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchArtist(id),
    enabled: !!id,
  });
}
