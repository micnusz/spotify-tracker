// hooks/useUserTopItems.ts
import { SpotifyApi, UserTopItemsParams } from "@/types/spotify";
import { useQuery } from "@tanstack/react-query";

const fetchUserTopItems = async <T extends "artists" | "tracks">(
  type: T,
  params: UserTopItemsParams = {}
): Promise<
  T extends "artists"
    ? SpotifyApi.UsersTopArtistsResponse
    : SpotifyApi.UsersTopTracksResponse
> => {
  const queryParams = new URLSearchParams({
    time_range: params.time_range || "medium_term",
    limit: params.limit?.toString() || "20",
    offset: params.offset?.toString() || "0",
  }).toString();

  const res = await fetch(`/api/user/top/${type}?${queryParams}`);
  if (!res.ok) throw new Error(`Failed to fetch user top ${type}`);
  return res.json();
};

// Artists Hook
export const useUserTopArtists = (params: UserTopItemsParams = {}) => {
  return useQuery<SpotifyApi.UsersTopArtistsResponse>({
    queryKey: ["user", "top-artists", params],
    queryFn: () => fetchUserTopItems("artists", params),
  });
};

// Tracks Hook
export const useUserTopTracks = (params: UserTopItemsParams = {}) => {
  return useQuery<SpotifyApi.UsersTopTracksResponse>({
    queryKey: ["user", "top-tracks", params],
    queryFn: () => fetchUserTopItems("tracks", params),
  });
};
