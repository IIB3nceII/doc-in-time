import { IUser } from "../../../models";

/**
 * AUTH_ACTION_TYPE enum for auth actions.
 * @enum
 */
export enum AUTH_ACTION_TYPE {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

/**
 * It returns an object with a type property and a payload property.
 * @param {User} IUser Object of the current user
 * @action
 */
export const setUser = (user: IUser | null) => ({
  type: AUTH_ACTION_TYPE.LOGIN,
  payload: user,
});
