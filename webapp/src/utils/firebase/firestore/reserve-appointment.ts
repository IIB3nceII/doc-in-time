import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It takes an appointment slot id, start date, and end date, and updates the appointment slot with the new start date and end date.
 * @param {IAppointmentSlot}  - IAppointmentSlot - this is the interface that we created earlier.
 * @firestore
 */
const reserveAppointment = async (id: string, patient: string): Promise<void> => {
  try {
    if (id) {
      const appointmentsRef = doc(db, "appointments", id);
      await updateDoc(appointmentsRef, {
        patient,
        isReserved: true,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default reserveAppointment;
