import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const confirmDocAppointment = async (id: string): Promise<void> => {
  try {
    await updateDoc(doc(db, "appointments", id), {
      confirmed: true,
    });
  } catch (err) {
    console.error(err);
  }
};

export default confirmDocAppointment;
