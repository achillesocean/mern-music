import type {
  Song,
  CreateSongPayload,
  UpdateSongPayload,
  Statistics,
} from "../types/songTypes";

const API_BASE_URL = "https://mern-music.vercel.app/api";
const USE_MOCK = false;
const MOCK_DELAY = 300;

let mockSongs: Song[] = [
  {
    _id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    genre: "Rock",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    title: "Take Five",
    artist: "Dave Brubeck Quartet",
    album: "Time Out",
    genre: "Jazz",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
    createdAt: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateId = () => Math.random().toString(36).substr(2, 9);

export const songsApi = {
  getAll: async (): Promise<Song[]> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);
      return [...mockSongs];
    }

    const response = await fetch(`${API_BASE_URL}/songs`);
    if (!response.ok) throw new Error("Failed to fetch songs");
    const data = await response.json();
    return data;
  },

  /**
   * GET /api/songs/:id - Fetch a single song
   */
  getById: async (id: string): Promise<Song> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);
      const song = mockSongs.find((s) => s._id === id);
      if (!song) throw new Error("Song not found");
      return { ...song };
    }

    const response = await fetch(`${API_BASE_URL}/songs/${id}`);
    if (!response.ok) throw new Error("Song not found");
    const data = await response.json();
    return data;
  },

  /**
   * POST /api/songs - Create a new song
   */
  create: async (songData: CreateSongPayload): Promise<Song> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);
      const newSong: Song = {
        ...songData,
        _id: generateId(),
        createdAt: new Date().toISOString(),
      };
      mockSongs.push(newSong);
      return newSong;
    }

    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(songData),
    });
    if (!response.ok) throw new Error("Failed to create song");
    const data = await response.json();
    return data;
  },

  /**
   * PUT /api/songs/:id - Update a song
   */
  update: async (id: string, songData: UpdateSongPayload): Promise<Song> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);
      const index = mockSongs.findIndex((s) => s._id === id);
      if (index === -1) throw new Error("Song not found");

      mockSongs[index] = {
        ...mockSongs[index],
        ...songData,
        updatedAt: new Date().toISOString(),
      };
      return { ...mockSongs[index] };
    }

    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(songData),
    });
    if (!response.ok) throw new Error("Failed to update song");
    const data = await response.json();
    return data;
  },

  /**
   * DELETE /api/songs/:id - Delete a song
   */
  delete: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);
      const index = mockSongs.findIndex((s) => s._id === id);
      if (index === -1) throw new Error("Song not found");
      mockSongs.splice(index, 1);
      return;
    }

    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete song");
  },
};

/**
 * =============================================================================
 * STATISTICS API
 * =============================================================================
 */
export const statisticsApi = {
  getAll: async (): Promise<Statistics> => {
    if (USE_MOCK) {
      await delay(MOCK_DELAY);

      // Calculate statistics from mock data
      const songs = mockSongs;

      // Get unique values
      const artists = [...new Set(songs.map((s) => s.artist))];
      const albums = [...new Set(songs.map((s) => s.album))];
      const genres = [...new Set(songs.map((s) => s.genre))];

      // Count songs by genre
      const songsByGenre: Record<string, number> = {};
      songs.forEach((song) => {
        songsByGenre[song.genre] = (songsByGenre[song.genre] || 0) + 1;
      });

      // Count songs by artist
      const songsByArtist: Record<string, number> = {};
      songs.forEach((song) => {
        songsByArtist[song.artist] = (songsByArtist[song.artist] || 0) + 1;
      });

      // Count albums by artist
      const albumsByArtist: Record<string, number> = {};
      const artistAlbumMap = new Map<string, Set<string>>();
      songs.forEach((song) => {
        if (!artistAlbumMap.has(song.artist)) {
          artistAlbumMap.set(song.artist, new Set());
        }
        artistAlbumMap.get(song.artist)!.add(song.album);
      });
      artistAlbumMap.forEach((albumSet, artist) => {
        albumsByArtist[artist] = albumSet.size;
      });

      // Count songs by album
      const songsByAlbum: Record<string, number> = {};
      songs.forEach((song) => {
        songsByAlbum[song.album] = (songsByAlbum[song.album] || 0) + 1;
      });

      return {
        totalSongs: songs.length,
        totalArtists: artists.length,
        totalAlbums: albums.length,
        totalGenres: genres.length,
        songsByGenre,
        songsByArtist,
        albumsByArtist,
        songsByAlbum,
      };
    }

    const response = await fetch(`${API_BASE_URL}/statistics`);
    if (!response.ok) throw new Error("Failed to fetch statistics");
    const rawData = await response.json();

    const normalized: Statistics = {
      totalSongs: rawData.overall?.totalSongs || 0,
      totalArtists: rawData.overall?.totalArtists || 0,
      totalAlbums: rawData.overall?.totalAlbums || 0,
      totalGenres: rawData.overall?.totalGenres || 0,
      songsByGenre:
        rawData.songsPerGenre?.reduce(
          (
            acc: Record<string, number>,
            item: { genre: string; count: number }
          ) => {
            acc[item.genre] = item.count;
            return acc;
          },
          {}
        ) || {},
      songsByArtist:
        rawData.songsAlbumsPerArtist?.reduce(
          (
            acc: Record<string, number>,
            item: { artist: string; songCount: number }
          ) => {
            acc[item.artist] = item.songCount;
            return acc;
          },
          {}
        ) || {},
      albumsByArtist:
        rawData.songsAlbumsPerArtist?.reduce(
          (
            acc: Record<string, number>,
            item: { artist: string; albumCount: number }
          ) => {
            acc[item.artist] = item.albumCount;
            return acc;
          },
          {}
        ) || {},
      songsByAlbum:
        rawData.songsPerAlbum?.reduce(
          (
            acc: Record<string, number>,
            item: { album: string; songCount: number }
          ) => {
            acc[item.album] = item.songCount;
            return acc;
          },
          {}
        ) || {},
    };

    return normalized;
  },
};
