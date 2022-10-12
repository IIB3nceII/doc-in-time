/**
 * UI_ACTION_TYPE enum for ui actions.
 * @enum
 */
export enum UI_ACTION_TYPE {
  CHANGE_THEME = "CHANGE_THEME",
  CHANGE_SEARCH_AREA_OPEN = "CHANGE_SEARCH_AREA_OPEN",
}

/**
 * It returns an object with a type property and a payload property
 * @param {boolean} isDarkTheme - boolean - This is the value that we want to set the isDarkTheme state to.
 * @action
 */
export const setIsDarkTheme = (isDarkTheme: boolean) => ({
  type: UI_ACTION_TYPE.CHANGE_THEME,
  payload: isDarkTheme,
});

/**
 * It returns an object with a type property and a payload property.
 * @param {boolean} isSearchAreaOpen - boolean
 * @action
 */
export const setIsSearchAreaOpen = (isSearchAreaOpen: boolean) => ({
  type: UI_ACTION_TYPE.CHANGE_SEARCH_AREA_OPEN,
  payload: isSearchAreaOpen,
});
