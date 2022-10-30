import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { IClinic } from "src/models";

const getClinics = async (): Promise<void> => {
  try {
    const clinicsRef = await collection(db, "clinics");
    const clinicsCollection = await getDocs(clinicsRef);

    console.log(clinicsCollection);
  } catch (err) {
    console.error(err);
  }
};

export default getClinics;
