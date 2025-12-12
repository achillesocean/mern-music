// RTK Slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ISong } from "../../../server/src/models/Song";

// state shape
interface SongsState {
  songs: ISong[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
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
      state.isLoading = false;
      state.songs = action.payload;
    },
    // TODO: other reducers here.
  },
});

export const { fetchSongsRequest, fetchSongsSuccess } = songsSlice.actions;
export default songsSlice.reducer;
