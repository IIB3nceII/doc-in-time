import { User } from "firebase/auth";
import IDoc from "./doc.model";

export default interface IUser extends User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isDoc: boolean;
  doc: IDoc;
  tajNumber?: string;
}

export interface IUserData {
  uid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isDoc: boolean;
  doc: IDoc | object;
  tajNumber?: string;
  phoneNumber?: string;
}