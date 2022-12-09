import { IAppointmentSlot } from "src/models";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It takes an object with a userId, startDate, and endDate, and adds a new document to the appointments collection with those values.
 * @param {IAppointmentSlot}  - IAppointmentSlot: This is the interface that we created earlier.
 * @firestore
 */
const addNewAppointment = async ({ doc, startDate, endDate, clinic, problem, patient }: IAppointmentSlot): Promise<void> => {
  try {
    await addDoc(collection(db, "appointments"), {
      doc,
      startDate,
      endDate,
      clinic,
      problem,
      patient,
      confirmed: false,
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewAppointment;
