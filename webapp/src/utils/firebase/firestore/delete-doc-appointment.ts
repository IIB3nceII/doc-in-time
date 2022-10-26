import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const deleteDocAppointment = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "appointmentSlots", id));
  } catch (err) {
    console.error(err);
  }
};

export default deleteDocAppointment;
