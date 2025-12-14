// configureStore, combine reducers
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import songsReducer from "./slices/songsSlice";
import statsReducer from "./slices/statsSlice";
import { all } from "redux-saga/effects";
import { songsSaga } from "./sagas/songsSaga";
import { statsSaga } from "./sagas/statsSaga";

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
});

function* rootSaga() {
  yield all([songsSaga(), statsSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
