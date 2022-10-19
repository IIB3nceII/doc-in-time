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
  account: IUser | null;
  errorMessage: string;
  redirectMessage: string;
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
        loading: true,
      };
    case AUTH_ACTION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
        isAuthenticated: true,
        loginSuccess: true,
      };
    case AUTH_ACTION_TYPE.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loginError: true,
        errorMessage: action.payload,
      };
    case AUTH_ACTION_TYPE.REGISTER:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTION_TYPE.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loginSuccess: true,
        account: action.payload,
        loading: false,
      };
    case AUTH_ACTION_TYPE.REGISTER_FAIL:
      return {
        ...state,
        loginError: true,
        errorMessage: action.payload,
        loading: false,
      };
    case AUTH_ACTION_TYPE.LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTION_TYPE.LOGOUT_SUCCESS:
      return {
        ...state,
        account: null,
        isAuthenticated: false,
        loginSuccess: false,
        loading: false,
      };
    case AUTH_ACTION_TYPE.LOGOUT_FAIL:
      return {
        ...state,
        loginError: true,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
