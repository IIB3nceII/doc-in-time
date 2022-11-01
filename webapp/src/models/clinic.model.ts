export default interface IClinic {
  id: string;
  address: string;
  city: string;
  docs: any[];
  email: string;
  name: string;
  imageUrl: string;
  phone: string;
  postalCode: number;
  street: string;
  exampleRef: any;
  geoLocation: { lat: number; lng: number; addressLine: string };
}
