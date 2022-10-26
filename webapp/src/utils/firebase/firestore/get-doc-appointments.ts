import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { IAppointmentSlot } from "src/models";
import { db } from "../firebase.config";

const getDocAppointments = async (userId: string): Promise<IAppointmentSlot[] | void> => {
  try {
    const q = query(collection(db, "appointmentSlots"), where("userId", "==", userId));
    const querySnapShot = await getDocs(q);
    const appointments: IAppointmentSlot[] = [];
    querySnapShot.forEach((doc) => {
      appointments.push({
        userId: doc.data().userId,
        startDate: new Date((doc.data().startDate as Timestamp).toDate()),
        endDate: new Date((doc.data().endDate as Timestamp).toDate()),
      });
    });

    return appointments;
  } catch (err) {
    console.error(err);
  }
};

export default getDocAppointments;
