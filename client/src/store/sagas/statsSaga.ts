import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} from "../slices/statsSlice";
import { statisticsApi } from "../../services/api";
import type { Statistics } from "../../types/songTypes";

function* fetchStatisticsSaga() {
  try {
    const statistics: Statistics = yield call(statisticsApi.getAll);
    yield put(fetchStatisticsSuccess(statistics));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch statistics";
    yield put(fetchStatisticsFailure(errorMessage));
  }
}

export function* watchStatisticsSaga() {
  yield takeLatest(fetchStatisticsRequest.type, fetchStatisticsSaga);
}
