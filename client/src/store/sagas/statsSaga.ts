import { call, put, takeLatest } from "redux-saga/effects";
import { fetchStatsAPI } from "../../api/songsApi";
import {
  fetchStatsRequest,
  fetchStatsFailure,
  fetchStatsSuccess,
} from "../slices/statsSlice";
import type { IStats } from "../../types/songTypes";

function* fetchStatsWorker(): Generator<any, void, any> {
  try {
    const stats: IStats = yield call(fetchStatsAPI);

    yield put(fetchStatsSuccess(stats));
  } catch (error) {
    yield put(
      fetchStatsFailure(
        error instanceof Error ? error.message : "Unknown error"
      )
    );
  }
}

export function* statsSaga() {
  yield takeLatest(fetchStatsRequest.type, fetchStatsWorker);
}
