import IllnessType from "./illness.model";

export default interface IDoc {
  fields: string[];
  knowledges: IllnessType[];
  clinics: { clinicId: string; }[];
}
