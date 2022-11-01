import { User } from "firebase/auth";
import IDoc from "./doc.model";

export default interface IUser extends User {
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  imageUrl: any;
  isDoc: boolean;
  doc: IDoc;
}
