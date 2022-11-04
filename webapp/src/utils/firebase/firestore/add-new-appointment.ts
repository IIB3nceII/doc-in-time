import { IAppointmentSlot } from "src/models";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It takes an object with a userId, startDate, and endDate, and adds a new document to the appointmentSlots collection with those values.
 * @param {IAppointmentSlot}  - IAppointmentSlot: This is the interface that we created earlier.
 * @firestore
 */
const addNewAppointment = async ({ userId, startYear, startMonth, startDay, startDate, endDate }: IAppointmentSlot): Promise<void> => {
  try {
    await addDoc(collection(db, "appointmentSlots"), {
      doc: userId,
      startYear,
      startMonth,
      startDay,
      startDate,
      endDate,
      iseReserved: false,
      patient: null,
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewAppointment;
