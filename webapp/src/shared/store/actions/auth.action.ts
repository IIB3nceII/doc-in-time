import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { ILoginFormData, IRegisterFormData, IUser } from "src/models";
import { auth } from "src/utils/firebase/firebase.config";

/**
 * AUTH_ACTION_TYPE enum for auth actions.
 * @enum
 */
export enum AUTH_ACTION_TYPE {
  LOGIN = "LOGIN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  REGISTER = "REGISTER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  LOGOUT = "LOGOUT",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_FAIL = "LOGOUT_FAIL",
}

/**
 * It takes in a data object, destructures the email and password from it, and then uses the createUserWithEmailAndPassword function to create a new user with the email and password.
 * If the user is successfully created, it returns an object with a type of REGISTER_SUCCESS and the user as the payload.
 * If the user is not successfully created, it returns an object with a type of
 * REGISTER_FAIL and the error message as the payload
 * @param {IRegisterFormData} data - IRegisterFormData - this is the data that is passed in from the form.
 * @returns An object with a type and a payload.
 */
export const registerUserWithEmail: (data: IRegisterFormData) => void = (data: IRegisterFormData) => async (dispatch: any) => {
  const { firstName, lastName, email, password } = data;

  dispatch({
    type: AUTH_ACTION_TYPE.REGISTER,
  });

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;

    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_SUCCESS,
      payload: { ...user, firstName, lastName },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_FAIL,
      payload: `Registration failed with error: ${err}`,
    });
  }
};

export const setUserSession: (user: IUser) => void = (user: IUser) => async (dispatch: any) => {
  if (user) {
    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;
  }

  dispatch({
    type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
    payload: user,
  });
};

export const loginUserWithEmail: (data: ILoginFormData) => void = (data: ILoginFormData) => async (dispatch: any) => {
  const { email, password } = data;

  dispatch({
    type: AUTH_ACTION_TYPE.LOGIN,
  });

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;

    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_FAIL,
      payload: `Loh in failed with error: ${err}`,
    });
  }
};

export const logOutUser: () => void = () => async (dispatch: any) => {
  dispatch({
    type: AUTH_ACTION_TYPE.LOGOUT,
  });

  try {
    await signOut(auth);
    dispatch({
      type: AUTH_ACTION_TYPE.LOGOUT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.LOGOUT_FAIL,
      payload: `Logout failed with error: ${err}`,
    });
  }
};
