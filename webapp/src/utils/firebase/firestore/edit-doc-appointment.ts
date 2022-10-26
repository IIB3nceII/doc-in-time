import { IAppointmentSlot } from "src/models";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const editDocAppointment = async ({ id, startDate, endDate }: IAppointmentSlot): Promise<void> => {
  try {
    if (id) {
      const appointmentsRef = doc(db, "appointmentSlots", id);
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
