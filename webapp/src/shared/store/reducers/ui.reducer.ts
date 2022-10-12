import { UI_ACTION_TYPE } from "../actions/ui.action";

export interface IUIState {
  isDarkTheme: boolean;
  isSearchAreaOpen: boolean;
}

const initialState: IUIState = {
  isDarkTheme: false,
  isSearchAreaOpen: false,
};

export type UIState = Readonly<typeof initialState>;

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
