import { call, put, takeLatest } from "redux-saga/effects";
import { fetchSongsRequest, fetchSongsSuccess } from "../songsSlice";
import { fetchSongsAPI } from "../../api/songs";

function* fetchSongsWorker(): Generator<any, void, any> {
  try {
    const songs = yield call(fetchSongsAPI);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

// watcher saga
export function* songsSaga() {
  // takeLatest will cancel any previous fetchSongsWorker if a new fetchSongsRequest is dispatched
  yield takeLatest(fetchSongsRequest.type, fetchSongsWorker);
  //TODO: add watchers for createSongRequest, updateSongRequest, etc
}
