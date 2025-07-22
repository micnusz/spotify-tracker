export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyFollowers = {
  href: string | null;
  total: number;
};

export type SpotifyExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

export type Artist = {
  external_urls: string;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  name: string;
  popularity: number;
  type: string;
  uri: string;
  images: SpotifyImage[];
};

export type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: SpotifyExplicitContent;
  external_urls: string[];
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
};
