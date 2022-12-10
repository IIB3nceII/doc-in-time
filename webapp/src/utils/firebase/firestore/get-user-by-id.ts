import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const getUserById = async (userId: string) => {
  try {
    if (userId) {
      const userRef = await doc(db, "users", userId.trim());
      const userSnap = await getDoc(userRef);

      return { ...userSnap.data() };
    }
  } catch (err) {
    console.error(err);
  }
  return {}
};

export default getUserById;
