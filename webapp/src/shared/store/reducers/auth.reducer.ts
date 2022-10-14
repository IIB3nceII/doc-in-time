import { IUser } from "../../../models";

/**
 * Defining the shape of the auth state.
 * @interface
 */
export interface IAuthState {
  loading: boolean;
  isAuthenticated: boolean;
  loginSuccess: boolean;
  loginError: boolean;
  account: IUser;
  errorMessage: string;
  redirectMessage: string;
  token: string;
  logoutUrl: string;
}

/**
 * Defining the initial state of the Auth reducer.
 */
const initialState: IAuthState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false,
  account: {} as IUser,
  errorMessage: null as unknown as string,
  redirectMessage: null as unknown as string,
  token: null as unknown as string,
  logoutUrl: null as unknown as string,
};

/**
 * Defining a type for Auth state.
 * @type
 */
export type AuthState = Readonly<typeof initialState>;

export const authReducer = (state: IAuthState = initialState, action: any) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
