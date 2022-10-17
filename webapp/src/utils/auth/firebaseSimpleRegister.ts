import { createUserWithEmailAndPassword, User } from "firebase/auth";
import { IRegisterFormData } from "src/models";
import { auth } from "../firebase/firebase.config";

const firebaseSimpleRegister = async (data: IRegisterFormData): Promise<User> => {
  const { email, password } = data;
  let user = null;

  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);

    console.log(credentials);

    user = credentials.user;
  } catch (err) {
    throw new Error(`${err}`);
  }

  return user;
};

export default firebaseSimpleRegister;
