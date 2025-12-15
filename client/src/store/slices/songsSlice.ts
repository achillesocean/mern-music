import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ISong, type SongsState } from "../../types/songTypes";

const initialState: SongsState = {
  list: [],
  isLoading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<ISong[]>) => {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createSongRequest: (
      state,
      action: PayloadAction<Omit<ISong, "_id" | "createdAt" | "updatedAt">>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    updateSongRequest: (state, action: PayloadAction<ISong>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSongRequest: (state, action: PayloadAction<string>) => {
      // Payload is the song ID
      state.isLoading = true;
      state.error = null;
    },

    createSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.list.unshift(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      // Payload is the song ID
      state.isLoading = false;
      // Filter out the song by ID. This creates a new array (Immutability in Redux)
      state.list = state.list.filter((song) => song._id !== action.payload); // State updated without page reload
    },
    updateSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.isLoading = false;
      const index = state.list.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.list[index] = action.payload; // State updated without page reload
      }
    },
  },
});

export const {
  fetchSongsRequest,
  createSongRequest, // New export (for UI dispatch)
  updateSongRequest,
  deleteSongRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
  deleteSongSuccess,
  updateSongSuccess,
} = songsSlice.actions;
export default songsSlice.reducer;
