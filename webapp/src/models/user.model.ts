import { User } from "firebase/auth";
import IDoc from "./doc.model";

export default interface IUser extends User {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  imageUrl: any;
  isDoc: boolean;
  doc: IDoc;
  dateOfBirth: number;
  clinics: any[];
}
