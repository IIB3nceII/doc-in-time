import IAppointmentSlot from "./appointment-slot.model";
import IClinic from "./clinic.model";
import IIllness from "./illness.model";

export default interface IAppointmentFormData {
  selectedProblem: IIllness | string;
  selectedClinic: IClinic | string;
  selectedAppointment: IAppointmentSlot | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  taj: string;
}
