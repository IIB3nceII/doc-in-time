import { IAppointmentSlot } from "src/models";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It takes an appointment slot id, start date, and end date, and updates the appointment slot with the new start date and end date.
 * @param {IAppointmentSlot}  - IAppointmentSlot - this is the interface that we created earlier.
 * @firestore
 */
const editDocAppointment = async ({ id, startDate, endDate }: IAppointmentSlot): Promise<void> => {
  try {
    if (id) {
      const appointmentsRef = await doc(db, "appointmentSlots", id);
      await updateDoc(appointmentsRef, {
        startDate,
        endDate,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export default editDocAppointment;
