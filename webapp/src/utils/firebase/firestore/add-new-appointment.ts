import { IAppointmentSlot } from "src/models";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

const addNewAppointment = async (data: IAppointmentSlot): Promise<void> => {
  try {
    await addDoc(collection(db, "appointmentSlots"), {
      userId: auth.currentUser?.uid,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  } catch (err) {
    console.error(err);
  }
};

export default addNewAppointment;
