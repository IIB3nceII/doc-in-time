import IUser from "./user.model";

export default interface IClinic {
  address: string;
  city: string;
  docs: IUser[];
  email: string;
  name: string;
  imageUrl: string;
  phone: string;
  postalCode: number;
  street: string;
}
