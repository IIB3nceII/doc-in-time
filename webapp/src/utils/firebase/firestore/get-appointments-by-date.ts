import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { IAppointmentSlot } from "src/models";
import { db } from "../firebase.config";
import { getImageByURL } from "../storage";
import getDoctor from "./get-doctor";

const getAppointmentsByDate = async (startYear: number, startMonth: number, startDay: number): Promise<IAppointmentSlot[] | void> => {
  try {
    const q = query(
      collection(db, "appointmentSlots"),
      where("startYear", "==", startYear),
      where("startMonth", "==", startMonth),
      where("startDay", "==", startDay)
    );
    const querySnapShot = await getDocs(q);
    const appointments: IAppointmentSlot[] = [];
    querySnapShot?.forEach((doc) => {
      appointments.push({
        id: doc.id,
        userId: doc.data().userId,
        startYear: doc.data().startYear,
        startMonth: doc.data().startMonth,
        startDay: doc.data().startDay,
        startDate: new Date((doc.data().startDate as Timestamp).toDate()),
        endDate: new Date((doc.data().endDate as Timestamp).toDate()),
      });
    });

    for (let i = 0; i < appointments.length; i++) {
      const u = await getDoctor(appointments[i].userId!);
      if (u) {
        u.imageUrl = await getImageByURL(u.imageUrl);
        appointments[i] = { ...appointments[i], user: u };
      }
    }

    return appointments;
  } catch (err) {
    console.error(err);
  }
};

export default getAppointmentsByDate;
