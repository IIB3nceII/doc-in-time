import { doc, updateDoc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import IAppointmentWithDetails from "src/models/appointment-details.model";
import { IRootState } from "src/shared/store";
import { auth, db } from "src/utils/firebase/firebase.config";
import { getIllness, getPatientAppointments } from "src/utils/firebase/firestore";

const MyAppointments: FC = () => {

    const [appointments, setAppointments] = useState<IAppointmentWithDetails[]>([]);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDoc = await getPatientAppointments("TRQUF6uWQzVsGbMuxV1ORpK3mgz2") // replace it with current uid
            if (userDoc)
            {
                const appointments: IAppointmentWithDetails[] = [];
                userDoc?.forEach(async (appointment) => {
                    const clinicDetails = (await getDoc(doc(db, "clinics", appointment.clinic))).data();
                    const illness = (await getDoc(doc(db, "illnesses", appointment.problem))).data();
                    
                    appointments.push({
                        id: appointment.id,
                        doc: appointment.doc,
                        startDate: appointment.startDate,
                        endDate: appointment.endDate,
                        confirmed: appointment.confirmed,
                        problem: appointment.problem,
                        patient: appointment.patient,
                        clinic: appointment.clinic,
                        clinicName: clinicDetails!.name,
                        problemName: illness!.name,
                    });
                });
                setAppointments(appointments);
            }
          }
          else
          {
            window.location.href = "/";
          }
        })
      }, []);
      

    console.log(appointments);
    return (
    <div>
        
    </div>
    );
};

const mapStateToProps = ({ auth }: IRootState) => ({
    auth,
});
  
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
  
export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);