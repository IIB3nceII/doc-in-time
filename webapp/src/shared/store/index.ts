import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, UIState } from "./reducers/ui.reducer";

/**
 * Defining the shape of the root state object.
 * @interface
 */
export interface IRootState {
  readonly ui: UIState;
}

/**
 * Creating a root reducer object that contains all the reducers.
 */
const rootReducer = {
  ui: uiReducer,
};

/**
 * Creating a store object that is used to dispatch actions and update the state.
 */
const store = configureStore<IRootState>({ reducer: rootReducer, devTools: process.env.NODE_ENV !== "production" });

export default store;
