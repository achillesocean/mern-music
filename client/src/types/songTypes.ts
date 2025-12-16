export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateSongPayload = Omit<Song, "_id" | "createdAt" | "updatedAt">;

// Used when updating a song - all fields optional except _id
export type UpdateSongPayload = Partial<CreateSongPayload> & { _id: string };

export interface Statistics {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsByGenre: Record<string, number>;
  songsByArtist: Record<string, number>;
  albumsByArtist: Record<string, number>;
  songsByAlbum: Record<string, number>;
}

// API response wrapper - standardizes all API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
