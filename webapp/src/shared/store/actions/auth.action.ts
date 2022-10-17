import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { IRegisterFormData } from "src/models";
import { auth } from "src/utils/firebase/firebase.config";

/**
 * AUTH_ACTION_TYPE enum for auth actions.
 * @enum
 */
export enum AUTH_ACTION_TYPE {
  LOGIN = "LOGIN",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  LOGOUT = "LOGOUT",
}

/**
 * It returns an object with a type property and a payload property.
 * @param {User} IUser Object of the current user
 * @action
 */
export const setUser = (user: User | null) => ({
  type: AUTH_ACTION_TYPE.LOGIN,
  payload: user,
});

/**
 * It takes in a data object, destructures the email and password from it, and then uses the createUserWithEmailAndPassword function to create a new user with the email and password.
 * If the user is successfully created, it returns an object with a type of REGISTER_SUCCESS and the user as the payload.
 * If the user is not successfully created, it returns an object with a type of
 * REGISTER_FAIL and the error message as the payload
 * @param {IRegisterFormData} data - IRegisterFormData - this is the data that is passed in from the form.
 * @returns An object with a type and a payload.
 */
export const registerUserWithEmail: (data: IRegisterFormData) => void = (data: IRegisterFormData) => async (dispatch: any) => {
  const { email, password } = data;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_SUCCESS,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_FAIL,
      payload: `Registration failed with error: ${err}`,
    });
  }
};
