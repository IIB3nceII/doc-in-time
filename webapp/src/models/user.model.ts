import { User } from "firebase/auth";
import IDoc from "./doc.model";

export default interface IUser extends User {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  isDoc: boolean;
  doc: IDoc;
}
