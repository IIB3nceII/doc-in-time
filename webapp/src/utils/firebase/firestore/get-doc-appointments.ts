import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { IAppointmentSlot } from "src/models";
import { db } from "../firebase.config";

/**
 * It takes a userId as an argument, queries the database for all documents in the appointments collection where the userId matches the userId passed in, and returns an array of appointment slots.
 * @param {string} userId - string - The userId of the doctor
 * @returns An array of appointment slots
 * @firestore
 */
const getDocAppointments = async (userId: string): Promise<IAppointmentSlot[] | void> => {
  try {
    const q = query(collection(db, "appointments"), where("doc", "==", userId));
    const querySnapShot = await getDocs(q);
    const appointments: IAppointmentSlot[] = [];
    querySnapShot?.forEach((doc) => {
      appointments.push({
        doc: doc.data().userId,
        startDate: new Date((doc.data().startDate as Timestamp).toDate()),
        endDate: new Date((doc.data().endDate as Timestamp).toDate()),
        patient: doc.data().patient,
        problem: doc.data().problem,
        confirmed: doc.data().isReserved,
        clinic: doc.data().clinic,
      });
    });

    return appointments;
  } catch (err) {
    console.error(err);
  }
};

export default getDocAppointments;
