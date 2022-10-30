import { db } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { IClinic } from "src/models";

const getClinics = async (): Promise<IClinic[] | undefined> => {
  try {
    const clinicsRef = await collection(db, "clinics");
    const clinicsCollection = await getDocs(clinicsRef);
    const clinics: IClinic[] = [];

    clinicsCollection?.forEach((doc: any) => {
      clinics.push(doc.data());
    });

    return clinics ?? [];
  } catch (err) {
    console.error(err);
  }
};

export default getClinics;
