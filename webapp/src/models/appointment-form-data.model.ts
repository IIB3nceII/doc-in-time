import IAppointmentSlot from "./appointment-slot.model";
import IClinic from "./clinic.model";
import IIllness from "./illness.model";

export default interface IAppointmentFormData {
  selectedProblem: IIllness;
  selectedClinic: IClinic;
  selectedAppointment: IAppointmentSlot | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tajNumber: string;
  desc: string;
}
