import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It deletes a document from the appointmentSlots collection in the database.
 * @param {string} id - The id of the document to delete
 * @firestore
 */
const deleteDocAppointment = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "appointmentSlots", id));
  } catch (err) {
    console.error(err);
  }
};

export default deleteDocAppointment;
