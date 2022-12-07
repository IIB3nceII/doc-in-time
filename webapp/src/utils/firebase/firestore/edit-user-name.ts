import { EmailAuthProvider, reauthenticateWithCredential, updateCurrentUser, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

export const editFirstName = async (id: string, newName: string) => {
  try {
    if (id) {
      const userRef = await doc(db, "users", id);
      const res = await updateDoc(userRef, {
        firstName: newName.trim(),
      });

      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
};

export const editLastName = async (id: string, newName: string) => {
  try {
    if (id) {
      const userRef = await doc(db, "users", id);
      const res = await updateDoc(userRef, {
        editLastName: newName.trim(),
      });

      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
};

export const editEmail = async (id: string, newName: string, tajNum: string) => {
  try {
    if (id) {
      const userRef = await doc(db, "users", id);
      const res = await updateDoc(userRef, {
        email: newName.trim(),
      });


      if (auth.currentUser) {
        if (tajNum)
          return;

        const password = prompt("Add meg a jelszavad az email módosítása előtt!");
        if (!password)
          return;

        var credentials = EmailAuthProvider.credential(
          auth.currentUser.email!,
          password
        );

        const result = await reauthenticateWithCredential(
            auth.currentUser, 
            credentials
        )
        
        const res = await updateEmail(auth.currentUser, newName);
        
        console.log(res);
      }

      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
};

export const editPhoneNumber = async (id: string, newName: string) => {
  try {
    if (id) {
      const userRef = await doc(db, "users", id);
      const res = await updateDoc(userRef, {
        phone: newName.trim(),
      });

      console.log(res);
    }
  } catch (err) {
    console.error(err);
  }
};