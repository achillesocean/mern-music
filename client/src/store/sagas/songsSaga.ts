import { call, put, takeLatest } from "redux-saga/effects";
import { fetchSongsAPI, createSongAPI } from "../../api/songsApi";

import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongSuccess,
} from "../slices/songsSlice";

import { fetchStatsRequest } from "../slices/statsSlice";
import { type ISong } from "../../types/songTypes";
import type { PayloadAction } from "@reduxjs/toolkit";

type FetchSongsAction = ReturnType<typeof fetchSongsRequest>;

// worker saga: executes the api call and dispatches success/failure actions
function* fetchSongsWorker(
  action: FetchSongsAction
): Generator<any, void, any> {
  try {
    const songs: ISong[] = yield call(fetchSongsAPI);

    // put is a saga effect that dispatches an action to the Redux store -- to the reducers.
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    yield put(
      fetchSongsFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

// worker saga that handles song creation
function* createSongWorker(
  action: PayloadAction<Omit<ISong, "_id" | "createdAt" | "updatedAt">>
): Generator<any, void, any> {
  try {
    const newSong: ISong = yield call(createSongAPI, action.payload);

    yield put(createSongSuccess(newSong));
    // re-fetch stats to reflect the new total number of songs/genres/artists
    yield put(fetchStatsRequest());
  } catch (error) {
    // yield put(createSongFailure(error...));
    console.error("Failed to create song:", error);
  }
}
// watcher saga
export function* songsSaga() {
  // takeLatest will cancel any previous fetchSongsWorker if a new fetchSongsRequest is dispatched
  yield takeLatest(fetchSongsRequest.type, fetchSongsWorker);
  //TODO: add watchers for createSongRequest, updateSongRequest, etc
  yield takeLatest("songs/createSongRequest", createSongWorker);
}
