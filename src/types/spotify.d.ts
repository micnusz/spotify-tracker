declare namespace SpotifyApi {
  // Main response interfaces
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

  interface CurrentUsersProfileResponse {
    country: string;
    display_name: string;
    email?: string;
    explicit_content?: {
      filter_enabled: boolean;
      filter_locked: boolean;
    };
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    href: string;
    id: string;
    images: ImageObject[];
    product?: string;
    type: "user";
    uri: string;
  }

  // Track objects
  interface TrackObjectFull {
    album: AlbumObjectSimplified;
    artists: ArtistObjectSimplified[];
    available_markets?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIdObject;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    is_playable?: boolean;
    linked_from?: TrackLinkObject;
    restrictions?: RestrictionsObject;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
  }

  interface TrackObjectSimplified {
    artists: ArtistObjectSimplified[];
    available_markets?: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    is_playable?: boolean;
    linked_from?: TrackLinkObject;
    restrictions?: RestrictionsObject;
    name: string;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
  }

  // Album objects
  interface AlbumObjectFull {
    album_type: "album" | "single" | "compilation";
    artists: ArtistObjectSimplified[];
    available_markets: string[];
    copyrights: CopyrightObject[];
    external_ids: ExternalIdObject;
    external_urls: ExternalUrlObject;
    genres: string[];
    href: string;
    id: string;
    images: ImageObject[];
    label: string;
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: RestrictionsObject;
    tracks: PagingObject<TrackObjectSimplified>;
    type: "album";
    uri: string;
  }

  interface AlbumObjectSimplified {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets?: string[];
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: RestrictionsObject;
    type: "album";
    uri: string;
    artists: ArtistObjectSimplified[];
  }

  // Artist objects
  interface ArtistObjectFull {
    external_urls: ExternalUrlObject;
    followers: FollowersObject;
    genres: string[];
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
  }

  interface ArtistObjectSimplified {
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
  }

  // Paging objects
  interface PagingObject<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  }

  // Helper interfaces
  interface ExternalUrlObject {
    spotify: string;
  }

  interface ExternalIdObject {
    isrc?: string;
    ean?: string;
    upc?: string;
  }

  interface FollowersObject {
    href: null | string;
    total: number;
  }

  interface ImageObject {
    height?: number;
    width?: number;
    url: string;
  }

  interface RestrictionsObject {
    reason: "market" | "product" | "explicit";
  }

  interface TrackLinkObject {
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    type: "track";
    uri: string;
  }

  interface CopyrightObject {
    text: string;
    type: "C" | "P";
  }

  interface ContextObject {
    type: "artist" | "playlist" | "album";
    href: string;
    external_urls: ExternalUrlObject;
    uri: string;
  }

  interface PlayHistoryObject {
    track: TrackObjectSimplified;
    played_at: string;
    context: ContextObject | null;
  }

  interface RecentlyPlayedTracksResponse {
    href: string;
    items: PlayHistoryObject[];
    limit: number;
    next: string | null;
    cursors: CursorObject;
    total: number;
  }

  interface CursorObject {
    after?: string;
    before?: string;
  }

  interface PlaylistTrackObject {
    added_at: string | null;
    added_by: PublicUserObject | null;
    is_local: boolean;
    track: TrackObjectFull | null;
  }

  interface PublicUserObject {
    display_name?: string;
    external_urls: ExternalUrlObject;
    followers?: FollowersObject;
    href: string;
    id: string;
    images?: ImageObject[];
    type: "user";
    uri: string;
  }
  interface UsersPlaylistsResponse {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedPlaylistObject[];
  }

  interface FeaturedPlaylistsResponse {
    message?: string;
    playlists: PagingObject<SimplifiedPlaylistObject>;
  }

  interface PlaylistResponse extends PlaylistObjectFull {}

  // Playlist objects
  interface SimplifiedPlaylistObject {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    owner: PublicUserObject;
    public: boolean | null;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: "playlist";
    uri: string;
    primary_color?: string | null;
  }

  interface PlaylistObjectFull extends SimplifiedPlaylistObject {
    followers: FollowersObject;
    tracks: PagingObject<PlaylistTrackObject>;
  }

  interface PlaylistTrackObject {
    added_at: string;
    added_by: PublicUserObject;
    is_local: boolean;
    primary_color?: string | null;
    track: TrackObjectFull | EpisodeObject | null;
    video_thumbnail?: {
      url?: string | null;
    };
  }

  // Episode object (dla podcastów)
  interface EpisodeObject {
    audio_preview_url: string | null;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrlObject;
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    resume_point?: ResumePointObject;
    type: "episode";
    uri: string;
  }

  interface ResumePointObject {
    fully_played: boolean;
    resume_position_ms: number;
  }
}

// types/user.d.ts
export interface UserTopItemsParams {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
  offset?: number;
}
export interface UserPlaylistsParams {
  limit?: number;
  offset?: number;
}
