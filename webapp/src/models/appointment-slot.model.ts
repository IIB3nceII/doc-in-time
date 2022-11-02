import IUser from "./user.model";

export default interface IAppointmentSlot {
  id?: string;
  userId?: string;
  user?: IUser;
  startYear: number;
  startMonth: number;
  startDay: number;
  startDate: Date;
  endDate: Date;
}
