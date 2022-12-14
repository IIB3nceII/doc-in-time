import { doc, getDoc } from "firebase/firestore";
import { IUser } from "src/models";
import { db } from "../firebase.config";

const getDoctor = async (userId: string): Promise<IUser | void> => {
  try {
    const docRef = doc(db, "users", userId.trim());
    const docSnap = await getDoc(docRef);

    return { ...docSnap.data(), id: docSnap.id } as IUser;
  } catch (err) {
    console.error(err);
  }
};

export default getDoctor;
