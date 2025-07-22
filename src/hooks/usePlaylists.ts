import { SpotifyApi, UserPlaylistsParams } from "@/types/spotify";
import { useQuery } from "@tanstack/react-query";

export async function fetchPlaylists(
  params: UserPlaylistsParams = {}
): Promise<SpotifyApi.UsersPlaylistsResponse> {
  const queryParams = new URLSearchParams({
    limit: params.limit?.toString() ?? "20",
    offset: params.offset?.toString() ?? "0",
  });

  const res = await fetch(`/api/user/playlists?${queryParams}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch user playlists");
  }

  return res.json();
}

// Playlist Hook
export function usePlaylists(params: UserPlaylistsParams = {}) {
  return useQuery<SpotifyApi.UsersPlaylistsResponse, Error>({
    queryKey: ["user", "playlists", params],
    queryFn: () => fetchPlaylists(params),
  });
}
