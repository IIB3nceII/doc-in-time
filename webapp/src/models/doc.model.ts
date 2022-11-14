import IIllness from "./illness.model";

export default interface IDoc {
  firstName: string;
  lastName: string;
  fields: string[];
  knowledges: IIllness[];
  clinics?: { clinicId: string; clinicName: string; color: string }[];
}
