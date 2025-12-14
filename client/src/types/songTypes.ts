export interface ISong {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStats {
  overall: {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalGenres: number;
  };
  songsPerGenre: { genre: string; count: number }[];
  songsAlbumsPerArtist: {
    artist: string;
    songCount: number;
    albumCount: number;
  }[];
  songsPerAlbum: { album: string; artist: string; songCount: number }[];
  // TODO: add other stats
}

// interface consistent with ad for the redux state of songs
export interface SongsState {
  list: ISong[];
  isLoading: boolean;
  error: string | null;
}
