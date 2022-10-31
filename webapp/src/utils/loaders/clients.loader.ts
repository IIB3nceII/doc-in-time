import { IClinic, IUser } from "src/models";
import { getClinics, getDoctor } from "../firebase/firestore";

const clientsLoader = async (): Promise<IClinic[] | void> => {
  try {
    const clinics = (await getClinics()) as IClinic[];

    if (clinics?.length) {
      for (let clinic of clinics) {
        if (clinic.docs.length) {
          const arr: IUser[] = [];
          for (let userId of clinic.docs) {
            const d: IUser = (await getDoctor(String(userId))) as IUser;
            d && arr.push(d);
          }
          clinic.docs = [...arr];
        }
      }
    }

    return clinics as IClinic[];
  } catch (err) {
    console.error(err);
  }
};

export default clientsLoader;
