// Business logic; how to interact with the database. it takes a request, req, and sends back a response, res.
import { Request, Response } from "express";
import Song, { ISong } from "../models/Song";

// GET /songs - list of all songs
export const getSongs = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
    console.log("Failed to fetch songs");
  }
};

export const getSong = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        error: "Song not found",
      });
    }

    res.status(200).json(song);
  } catch (error) {
    if ((error as { kind: string }).kind === "ObjectId") {
      return res.status(404).json({
        error: "Song not found",
      });
    }
    res.status(500).json({
      error: "Server error",
    });
  }
};

// POST /api/songs - create a new song
export const createSong = async (
  req: Request<{}, {}, ISong>,
  res: Response
) => {
  const { title, artist, album, genre } = req.body;

  try {
    const newSong = new Song({ title, artist, album, genre });
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: "Failed to create song", error });
  }
};

// PUt /api/songs/:id - update a song
export const updateSong = async (
  req: Request<{ id: string }, {}, ISong>,
  res: Response
) => {
  const { id } = req.params;
  const { title, artist, album, genre } = req.body;

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, artist, album, genre },
      { new: true, runValidators: true }
    );

    if (!updateSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: "Failed to update song", error });
  }
};

// DELETE /api/songs/:id - removeing a song
export const deleteSong = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const deletedSong = await Song.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete song", error });
  }
};
