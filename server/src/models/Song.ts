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
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<ISongDocument>("Song");
