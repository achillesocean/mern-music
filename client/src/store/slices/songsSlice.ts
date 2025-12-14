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

    createSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.list.unshift(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((song) => song._id !== action.payload);
      state.isLoading = false;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.list = state.list.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
  deleteSongSuccess,
  updateSongSuccess,
} = songsSlice.actions;
export default songsSlice.reducer;
