import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer, AuthState } from "./reducers/auth.reducer";
import { uiReducer, UIState } from "./reducers/ui.reducer";

/**
 * Defining the shape of the root state object.
 * @interface
 */
export interface IRootState {
  readonly ui: UIState;
  readonly auth: AuthState;
}

/**
 * Creating a root reducer object that contains all the reducers.
 */
const rootReducer = {
  ui: uiReducer,
  auth: authReducer,
};

/**
 * Creating a store object that is used to dispatch actions and update the state.
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(thunk),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
