import { Schema, model, Document } from "mongoose";

export interface ISong {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface ISongDocument extends ISong, Document {}

const SongSchema = new Schema<ISongDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // Removes leading/trailing whitespace
    },
    artist: {
      type: String,
      required: [true, "Artist is required"],
      trim: true,
    },
    album: {
      type: String,
      required: [true, "Album is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // Mongoose adds 'createdAt' and 'updatedAt' fields automatically
  }
);

export default model<ISongDocument>("Song", SongSchema);
