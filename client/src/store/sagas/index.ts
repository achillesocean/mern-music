/**
 * This file combines all individual sagas into one root saga.
 * The root saga is what we pass to sagaMiddleware.run() in the store.
 *
 * Think of it as the "main" function for all your async operations.
 */

import { all, fork } from "redux-saga/effects";
import { watchSongsSaga } from "./songsSaga";
import { watchStatisticsSaga } from "./statsSaga";

/**
 * rootSaga - Combines all sagas using the 'all' effect
 *
 * EFFECTS:
 * - all(): Runs multiple sagas in parallel
 * - fork(): Creates a non-blocking task (saga keeps running independently)
 *
 * This pattern allows all our sagas to run concurrently and independently.
 */
export default function* rootSaga() {
  yield all([
    fork(watchSongsSaga), // Watch for songs-related actions
    fork(watchStatisticsSaga), // Watch for statistics-related actions
  ]);
}
