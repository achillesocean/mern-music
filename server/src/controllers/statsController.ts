import { Request, Response } from "express";
import Song from "../models/Song";

export const getStats = async (req: Request, res: Response) => {
  try {
    // 1. Total Count for Songs, Unique Artists, Albums, Genres
    const summaryStats = await Song.aggregate([
      {
        $group: {
          _id: null, // Group all documents together
          totalSongs: { $sum: 1 }, // Count all documents
          uniqueArtists: { $addToSet: "$artist" }, // Collect unique artists
          uniqueAlbums: { $addToSet: "$album" }, // Collect unique albums
          uniqueGenres: { $addToSet: "$genre" }, // Collect unique genres
        },
      },
      {
        $project: {
          _id: 0,
          totalSongs: 1,
          totalArtists: { $size: "$uniqueArtists" }, // Count size of the set
          totalAlbums: { $size: "$uniqueAlbums" },
          totalGenres: { $size: "$uniqueGenres" },
        },
      },
    ]);

    // 2. Songs Per Genre
    const songsPerGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }, // Group by genre, count songs
      { $project: { genre: "$_id", count: 1, _id: 0 } }, // Clean up output field names
    ]);

    // 3. Songs & Albums Per Artist
    const songsAlbumsPerArtist = await Song.aggregate([
      {
        $group: {
          _id: "$artist",
          songCount: { $sum: 1 }, // Count total songs by this artist
          uniqueAlbums: { $addToSet: "$album" }, // Collect all unique albums
        },
      },
      {
        $project: {
          _id: 0,
          artist: "$_id",
          songCount: 1,
          albumCount: { $size: "$uniqueAlbums" }, // Count the unique albums
        },
      },
      { $sort: { songCount: -1 } }, // Sort by most prolific artist
    ]);

    // 4. Songs Per Album
    const songsPerAlbum = await Song.aggregate([
      {
        $group: {
          _id: "$album",
          artist: { $first: "$artist" }, // Capture one artist associated with the album
          songCount: { $sum: 1 },
        },
      },
      { $project: { _id: 0, album: "$_id", artist: 1, songCount: 1 } },
    ]);

    const finalStats = {
      overall: summaryStats[0] || {
        totalSongs: 0,
        totalArtists: 0,
        totalAlbums: 0,
        totalGenres: 0,
      },
      songsPerGenre,
      songsAlbumsPerArtist,
      songsPerAlbum,
    };

    res.status(200).json(finalStats);
  } catch (error) {
    console.error("Stats aggregation error:", error);
    res.status(500).json({ message: "Failed to fetch stats", error });
  }
};
