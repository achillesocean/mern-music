import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Song,
  CreateSongPayload,
  UpdateSongPayload,
} from "../../types/songTypes";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

/**
 * createSlice() creates:
 * - a reducer function, through songsSlice.reducer
 * - action creators for each reducer, through songsSlice.actions
 * - action type strings, eg, 'songs/fetchSongsRequest'
 */

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // PayloadAction<Song[]> means this action carries a payload of type Song[]
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
      state.error = null;
    },

    // carries an error message as payload
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSongRequest: (state, _action: PayloadAction<CreateSongPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongRequest: (state, _action: PayloadAction<UpdateSongPayload>) => {
      state.loading = true;
      state.error = null;
    },

    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload; // State updated without page reload
      }
      state.error = null;
    },

    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // payload is just the _id of the song to delete
    deleteSongRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      // Payload is the song ID
      state.loading = false;
      state.error = null;
      // Filter out the song by ID. This creates a new array (Immutability in Redux)
      state.songs = state.songs.filter((song) => song._id !== action.payload); // State updated without page reload
    },

    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  clearError,
} = songsSlice.actions;

// Export the reducer to be used in the store
export default songsSlice.reducer;
