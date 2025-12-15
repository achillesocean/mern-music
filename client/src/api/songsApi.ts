import { type ISong, type IStats } from "../types/songTypes";

const BASE_URL = "http://localhost:5000/api";

export async function fetchSongsAPI(): Promise<ISong[]> {
  const response = await fetch(`${BASE_URL}/songs`);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  return response.json() as Promise<ISong[]>;
}

export async function fetchStatsAPI(): Promise<IStats> {
  const response = await fetch(`${BASE_URL}/stats`);

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json() as Promise<IStats>;
}

export async function createSongAPI(
  song: Omit<ISong, "_id" | "createdAt" | "updatedAt">
): Promise<ISong> {
  const response = await fetch(`${BASE_URL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });

  if (!response.ok) {
    throw new Error("Failed to create song");
  }

  return response.json() as Promise<ISong>;
}

export async function updateSongAPI(
  id: string,
  songData: ISong
): Promise<ISong> {
  const response = await fetch(`${BASE_URL}/songs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songData),
  });

  if (!response.ok) {
    throw new Error("Failed to update song");
  }

  return response.json() as Promise<ISong>;
}

export async function deleteSongAPI(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/songs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete song");
  }
}
