import { IClinic, IIllness, IUser } from "src/models";
import { getClinics, getDoctor, getIllness } from "../firebase/firestore";
import { getImageByURL } from "../firebase/storage";

const clientsLoader = async (): Promise<IClinic[] | void> => {
  try {
    const clinics = (await getClinics()) as IClinic[];

    if (clinics?.length) {
      for (let clinic of clinics) {
        if (clinic.docs.length) {
          const arr: IUser[] = [];
          for (let userId of clinic.docs) {
            const d: IUser = (await getDoctor(String(userId))) as IUser;
            if (d) {
             /*  const oldUrl = d.imageUrl;
              d.imageUrl = await getImageByURL(oldUrl); */
              const ks: IIllness[] = [];
              for (let knowledge of d.doc.knowledges) {
                const k = (await getIllness(String(knowledge))) as IIllness;
                if (k) {
                  ks.push(k);
                }
              }
              d.doc.knowledges = [...ks];
              arr.push(d);
            }
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
