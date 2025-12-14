import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IStats } from "../../types/songTypes";

interface StatsState {
  data: IStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  isLoading: false,
  error: null,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<IStats>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } =
  statsSlice.actions;
export default statsSlice.reducer;
