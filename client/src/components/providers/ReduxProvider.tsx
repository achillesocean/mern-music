// this provider will make the Redux store available to all components

import { Provider } from "react-redux";
import { store } from "../../store";
import type React from "react";

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
