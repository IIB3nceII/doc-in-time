export default interface IAppointmentSlot {
  id?: string
  doc: any;
  startDate: Date;
  endDate: Date;
  confirmed: boolean;
  problem: any;
  patient: any;
  clinic: any;
}
