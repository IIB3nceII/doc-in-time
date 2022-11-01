import { db } from "../firebase.config";
import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { IClinic } from "src/models";

const getClinics = async (): Promise<IClinic[] | void> => {
  try {
    const clinicsRef = collection(db, "clinics");
    const clinicsCollection: QuerySnapshot<DocumentData> = await getDocs(clinicsRef);
    const clinics: IClinic[] = [];

    clinicsCollection?.forEach((doc: any) => {
      clinics.push({ ...doc.data(), id: doc.id });
    });

    return clinics;
  } catch (err) {
    console.error(err);
  }
};

export default getClinics;
