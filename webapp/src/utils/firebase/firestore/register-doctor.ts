import { IUser } from "src/models";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

/**
 * It takes an appointment slot id, start date, and end date, and updates the appointment slot with the new start date and end date.
 * @param {IAppointmentSlot}  - IAppointmentSlot - this is the interface that we created earlier.
 * @firestore
 */
const docRegister = async (clinic: string, doctor: string): Promise<void> => {
    try {
 
        // TODO: megtudni hova kell küldeni az adatot

    } catch (err) {
        console.error(err);
    }
};

export default docRegister;
