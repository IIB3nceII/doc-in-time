import { User } from "firebase/auth";
import { IUser } from "../../../models";
import { AUTH_ACTION_TYPE } from "../actions/auth.action";

/**
 * Defining the shape of the auth state.
 * @interface
 */
export interface IAuthState {
  loading: boolean;
  isAuthenticated: boolean;
  loginSuccess: boolean;
  loginError: boolean;
  account: User | null;
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
  account: null,
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
    case AUTH_ACTION_TYPE.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        loginSuccess: true,
        account: action.payload,
      };
    case AUTH_ACTION_TYPE.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loginSuccess: true,
        account: action.payload,
      };
    case AUTH_ACTION_TYPE.REGISTER_FAIL:
      return {
        ...state,
        loginError: true,
        errorMessage: action.payload,
      };
    default:
      return { ...state };
  }
};
