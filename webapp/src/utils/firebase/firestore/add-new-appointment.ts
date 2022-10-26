import { IAppointmentSlot } from "src/models";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const addNewAppointment = async ({ userId, startDate, endDate }: IAppointmentSlot): Promise<void> => {
  try {
    await addDoc(collection(db, "appointmentSlots"), {
      userId,
      startDate,
      endDate,
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewAppointment;
