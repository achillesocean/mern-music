import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
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
} from "../slices/songsSlice";
import { fetchStatisticsRequest } from "../slices/statsSlice";
import { songsApi } from "../../services/api";
import type {
  Song,
  CreateSongPayload,
  UpdateSongPayload,
} from "../../types/songTypes";

function* fetchSongsSaga() {
  try {
    const songs: Song[] = yield call(songsApi.getAll);
    console.log("songs fetched by the saga", songs);
    // put() - Dispatches an action to the Redux store
    // This is like calling dispatch(fetchSongsSuccess(songs))
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch songs";
    yield put(fetchSongsFailure(errorMessage));
  }
}

function* createSongSaga(action: PayloadAction<CreateSongPayload>) {
  try {
    const newSong: Song = yield call(songsApi.create, action.payload);

    // Dispatch success with the created song (now has _id from server)
    yield put(createSongSuccess(newSong));
    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create song";
    yield put(createSongFailure(errorMessage));
  }
}

function* updateSongSaga(action: PayloadAction<UpdateSongPayload>) {
  try {
    const updatedSong: Song = yield call(
      songsApi.update,
      action.payload._id,
      action.payload
    );
    yield put(updateSongSuccess(updatedSong));

    // Refresh statistics after update
    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update song";
    yield put(updateSongFailure(errorMessage));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    // The payload is just the song ID
    yield call(songsApi.delete, action.payload);
    yield put(deleteSongSuccess(action.payload));

    yield put(fetchStatisticsRequest());
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete song";
    yield put(deleteSongFailure(errorMessage));
  }
}

export function* watchSongsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);

  yield takeLatest(createSongRequest.type, createSongSaga);

  yield takeLatest(updateSongRequest.type, updateSongSaga);

  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
