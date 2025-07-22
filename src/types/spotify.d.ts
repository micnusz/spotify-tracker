// types/spotify.d.ts
declare namespace SpotifyApi {
  interface UsersTopArtistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: ArtistObjectFull[];
  }

  interface UsersTopTracksResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: TrackObjectFull[];
  }
}

// types/user.d.ts
export interface UserTopItemsParams {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
  offset?: number;
}
