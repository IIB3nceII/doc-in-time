import IUser from "./user.model";

export default interface IAppointmentSlot {
  id?: string;
  userId?: string;
  doc?: any;
  startYear: number;
  startMonth: number;
  startDay: number;
  startDate: Date;
  endDate: Date;
  isReserved?: boolean;
  patient?: any;
  clinic?: any;
}
