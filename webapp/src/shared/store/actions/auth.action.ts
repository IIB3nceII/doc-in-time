import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ILoginFormData, IRegisterFormData, IUser } from "src/models";
import ILoginTajFormData from "src/models/login-taj-form-data.model";
import IRegisterTajFormData from "src/models/register-taj-form-data.model";
import { IUserData } from "src/models/user.model";
import { auth, db } from "src/utils/firebase/firebase.config";
import { getUserById } from "src/utils/firebase/firestore";

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

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: firstName + " " + lastName,
      })

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: '',
        tajNumber: '',
        isDoc: false,
        doc: {}
      });
    }

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


export const registerUserWithTajNumber: (data: IRegisterTajFormData) => void = (data: IRegisterTajFormData) => async (dispatch: any) => {
  const { taj_number, firstName, lastName } = data;

  dispatch({
    type: AUTH_ACTION_TYPE.REGISTER,
  });

  try {
    const { user } = await createUserWithEmailAndPassword(auth, taj_number + '@dit.com', 'pass_' + taj_number + '_word');

    if (auth.currentUser) {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: '',
        phone: '',
        tajNumber: taj_number,
        isDoc: false,
        doc: {}
      });
    }

    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;

    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_SUCCESS,
      payload: { ...user },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.REGISTER_FAIL,
      payload: `Registration failed with error: ${err}`,
    });
  }
};

export const registerUserWithTajNumberWithoutSignin = async (data: IUserData) => {
  const {
    firstName,
    lastName,
    email,
    isDoc,
    tajNumber,
    phoneNumber
  } = data;

  try {
    const admin = auth.currentUser
    await createUserWithEmailAndPassword(auth, tajNumber + '@dit.com', 'pass_' + tajNumber + '_word');

    if (auth.currentUser) {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        tajNumber: tajNumber,
        isDoc: isDoc,
        doc: {}
      });
    }
    const uid = auth.currentUser?.uid

    auth.updateCurrentUser(admin)

    return uid
  } catch (err) {
    console.warn(err)
  }
};

/**
 * It takes a user object, and dispatches an action to the reducer.
 * @param {IUser} user - IUser - This is the user object that is returned from the Firebase.
 * authentication API.
 */
export const setUserSession: (user: IUser) => void = (user: IUser) => async (dispatch: any) => {
  if (user) {
    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;
  }

  const img = null; // await getImageByURL("");
  const userDetails = await getUserById(user.uid);

  if (userDetails) {
    const acc = { ...user, imageUrl: img, ...userDetails };
    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
      payload: acc,
    });
  } else {
    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
      payload: user,
    });
  }
};

/**
 * It takes in a data object, which is an interface that has an email and password property and then it dispatches an action to the reducer.
 * @param {ILoginFormData} data - ILoginFormData - this is the data that is passed in from the form.
 */
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

    const img = null; // await getImageByURL("");

    if (img) {
      const acc = { ...user, imageUrl: img };
      dispatch({
        type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
        payload: acc,
      });
    } else {
      dispatch({
        type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
        payload: user,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_FAIL,
      payload: `Loh in failed with error: ${err}`,
    });
  }
};

export const loginUserWithTaj: (data: ILoginTajFormData) => void = (data: ILoginTajFormData) => async (dispatch: any) => {
  const { taj_number } = data;

  dispatch({
    type: AUTH_ACTION_TYPE.LOGIN,
  });

  try {
    const { user } = await signInWithEmailAndPassword(auth, taj_number + '@dit.com', 'pass_' + taj_number + '_word');

    localStorage.refreshToken = (user as any).stsTokenManager.refreshToken;
    localStorage.accessToken = (user as any).stsTokenManager.accessToken;
    localStorage.expirationTime = (user as any).stsTokenManager.expirationTime;

    const img = null; // await getImageByURL("");

    if (img) {
      const acc = { ...user, imageUrl: img };
      dispatch({
        type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
        payload: acc,
      });
    } else {
      dispatch({
        type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
        payload: user,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ACTION_TYPE.LOGIN_FAIL,
      payload: `Loh in failed with error: ${err}`,
    });
  }
};

/**
 * When the user logs out, we dispatch an action to log out, then we try to sign out with Firebase,
 * and if it succeeds, we dispatch a success action, otherwise we dispatch a failure action.
 */
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
