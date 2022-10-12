export enum UI_ACTION_TYPE {
  CHANGE_THEME = "CHANGE_THEME",
  CHANGE_SEARCH_AREA_OPEN = "CHANGE_SEARCH_AREA_OPEN",
}

export const setIsDarkTheme = (isDarkTheme: boolean) => ({
  type: UI_ACTION_TYPE.CHANGE_THEME,
  payload: isDarkTheme,
});

export const setIsSearchAreaOpen = (isSearchAreaOpen: boolean) => ({
  type: UI_ACTION_TYPE.CHANGE_SEARCH_AREA_OPEN,
  payload: isSearchAreaOpen,
});
