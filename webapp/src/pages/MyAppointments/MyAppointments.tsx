import { doc } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import EditModal from "src/components/ui/EditModal/EditModal";
import { IAppointmentSlot } from "src/models";
import IAppointmentWithDetails from "src/models/appointment-details.model";
import { IRootState } from "src/shared/store";
import { auth, db } from "src/utils/firebase/firebase.config";
import { deleteDocAppointment, editDocAppointment, getPatientAppointments } from "src/utils/firebase/firestore";

const MyAppointments: FC = () => {
  const [appointments, setAppointments] = useState<IAppointmentWithDetails[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentAppointmentSlot, setCurrentAppointmentSlot] = useState<IAppointmentSlot | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getPatientAppointments(auth.currentUser?.uid!)
        if (userDoc) {
          const apps: IAppointmentWithDetails[] = [];
          await Promise.all(userDoc.map(async (appointment) => {
            const clinicDetails = (await getDoc(doc(db, "clinics", appointment.clinic))).data();
            const illness = (await getDoc(doc(db, "illnesses", appointment.problem))).data();

            apps.push({
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
          }));
          setAppointments(apps);
        }
      }
      else {
        window.location.href = "/";
      }
    })
  }, []);

  const deleteAppointment = async (id: string): Promise<void> => {
    try {
      if (currentAppointmentSlot) {
        await deleteDocAppointment(id);
        setIsDeleteModalOpen(false);
        setAppointments(appointments.filter(item => item.id !== currentAppointmentSlot.id))
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editAppointment = async (item: IAppointmentSlot): Promise<void> => {
    try {
      if (currentAppointmentSlot) {
        await editDocAppointment(item);
        setIsEditModalOpen(false);
        setAppointments(appointments.filter(item => item.id !== currentAppointmentSlot.id))
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', margin: '0 auto 32px', width: '100%', gap: 16, justifyContent: "center", alignItems: 'center', flexWrap: 'wrap', minHeight: 'calc(100vh - 10rem)' }}>
        {
          appointments.length > 0 ?
            (
              (appointments.map((item: any, ind: number) => {
                return (
                  <div key={ind} style={{ display: 'flex', flexDirection: 'column', border: '2px solid #18b6f6', color: '#188bf6', borderRadius: 8, backgroundColor: '#18b6f622', minWidth: "24%", maxWidth: '48%', padding: 16, justifyContent: 'center', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                    {item.clinicName}
                    <br />
                    {item.problemName}
                    <br />
                    <br />
                    {item.startDate.toLocaleString()}
                    <br />
                    -
                    <br />
                    {item.endDate.toLocaleString()}
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                      <button style={{ color: 'red' }} onClick={() => { setIsDeleteModalOpen(true); setCurrentAppointmentSlot(item) }}>Törlés</button>
                      <button style={{ color: 'black' }} onClick={() => { setIsEditModalOpen(true); setCurrentAppointmentSlot(item) }}>Módosítás</button>
                    </div>
                  </div>
                )
              }
              )))
            :
            (
              <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 10rem)', justifyContent: 'center', alignItems: 'center', fontSize: 24, fontWeight: 'bold' }}>Nincs megjeleníthető foglalása.</div>
            )
        }

        {isEditModalOpen && (
          <EditModal
            item={currentAppointmentSlot}
            submitButtonText={"Mentés"}
            cancelButtonText={"Mégse"}
            cancel={setIsEditModalOpen}
            submit={editAppointment}
          />
        )}

        {isDeleteModalOpen && (
          <ConfirmModal
            text={"Biztosan törölni szeretnéd a foglalásod?"}
            item={currentAppointmentSlot?.id}
            submitButtonText={"Törlés"}
            cancelButtonText={"Mégse"}
            cancel={setIsDeleteModalOpen}
            submit={deleteAppointment}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointments);