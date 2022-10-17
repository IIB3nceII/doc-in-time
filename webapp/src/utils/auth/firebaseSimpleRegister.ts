import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { IRegisterFormData } from "src/react-app-env";

const auth = getAuth();

const firebaseSimpleRegister = async (data: IRegisterFormData): Promise<User> => {
  const { email, password } = data;
  let user = null;

  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    user = credentials.user;
  } catch (err) {
    throw new Error(`${err}`);
  }

  return user ?? ({} as User);
};

export default firebaseSimpleRegister;
