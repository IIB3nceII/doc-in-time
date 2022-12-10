export default interface IAppointmentWithDetails {
    id?: string
    doc: any;
    startDate: Date;
    endDate: Date;
    confirmed: boolean;
    problem: any;
    patient: any;
    clinic: any;
    clinicName: string;
    problemName: string;
}