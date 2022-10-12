import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, UIState } from "./reducers/ui.reducer";

export interface IRootState {
  readonly ui: UIState;
}

const rootReducer = {
  ui: uiReducer,
};

const store = configureStore<IRootState>({ reducer: rootReducer, devTools: process.env.NODE_ENV !== "production" });

export default store;
