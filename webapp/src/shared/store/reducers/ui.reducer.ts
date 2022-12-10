import { UI_ACTION_TYPE } from "../actions/ui.action";

/**
 * Defining the shape of the ui state.
 * @interface
 */
export interface IUIState {
  isDarkTheme: boolean;
  isSearchAreaOpen: boolean;
}

/**
 * Defining the initial state of the UI reducer.
 */
const initialState: IUIState = {
  isDarkTheme: false,
  isSearchAreaOpen: false,
};

/**
 * Defining a type for UI state.
 * @type
 */
export type UIState = Readonly<typeof initialState>;

/**
 * Reducer for ui, it takes in a state and an action,
 * and returns a new state based on action the type.
 * @reducer
 * @param {IUIState} state - IUIState = initialState
 * @param {any} action - any
 * @returns The state of the UI
 */
export const uiReducer = (state: IUIState = initialState, action: any) => {
  switch (action.type) {
    case UI_ACTION_TYPE.CHANGE_THEME:
      return {
        ...state,
        isDarkTheme: action.payload,
      };
    case UI_ACTION_TYPE.CHANGE_SEARCH_AREA_OPEN:
      return {
        ...state,
        isSearchAreaOpen: action.payload,
      };
    default:
      return { ...state };
  }
};
