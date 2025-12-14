import type { RootState, AppDispatch } from "../store";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

// useSelector, useDispatch) are untyped by default
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
