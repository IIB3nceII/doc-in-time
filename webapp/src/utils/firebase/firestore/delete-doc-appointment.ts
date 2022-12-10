import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const deleteDocAppointment = async (id: string): Promise<void> => {
  try {
    console.log(id)
    await deleteDoc(doc(db, "appointments", id));
  } catch (err) {
    console.error(err);
  }
};

export default deleteDocAppointment;
