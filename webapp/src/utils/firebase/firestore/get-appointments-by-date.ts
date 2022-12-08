import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { IAppointmentSlot } from "src/models";
import { db } from "../firebase.config";
import { getImageByURL } from "../storage";
import getDoctor from "./get-doctor";

const getAppointmentsByDate = async (startYear: number, startMonth: number, startDay: number): Promise<IAppointmentSlot[] | void> => {
  try {
    const q = query(
      collection(db, "appointments"),
      where("startYear", "==", startYear),
      where("startMonth", "==", startMonth),
      where("startDay", "==", startDay)
    );
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

    for (let i = 0; i < appointments.length; i++) {
      const d = await getDoctor(appointments[i].doc!);
      if (d) {
        d.imageUrl = await getImageByURL(d.imageUrl);
        appointments[i] = { ...appointments[i], doc: d };
      }
    }

    return appointments;
  } catch (err) {
    console.error(err);
  }
};

export default getAppointmentsByDate;
