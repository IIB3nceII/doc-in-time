import { doc, getDoc } from "firebase/firestore";
import { IIllness } from "src/models";
import { db } from "../firebase.config";

const getIllness = async (illnessId: string): Promise<IIllness | void> => {
  try {
    const illnessRef = doc(db, "illnesses", illnessId.trim());
    const illnessSnap = await getDoc(illnessRef);

    return { ...illnessSnap.data(), id: illnessSnap.id } as IIllness;
  } catch (err) {
    console.error(err);
  }
};

export default getIllness;
