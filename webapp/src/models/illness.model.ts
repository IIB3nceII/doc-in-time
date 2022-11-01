export default interface IIllness {
  id: string;
  name: string;
  description: string;
  queryWord: string;
  type: IllnessType;
}

type IllnessType = "Allergy" | "Cold" | "Flu" | "Diarrhea" | "Headache" | "Mononucleosis" | "Stomach Ache";
