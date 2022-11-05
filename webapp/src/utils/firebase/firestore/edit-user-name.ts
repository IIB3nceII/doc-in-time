import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const editUserName = async (id: string, newName: string) => {
  try {
    if (id) {
      const [firstName, lastName] = newName.split(" ");
      const userRef = await doc(db, "users", id);
      const res = await updateDoc(userRef, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
};

export default editUserName;
