import { FC, Suspense, useMemo, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ContentLoading } from "src/components/common";
import { FinderForm } from "src/components/finder";
import { IClinic, IIllness } from "src/models";
import IUser from "src/models/user.model";
import s from "./AppointmentFinder.module.scss";
import { auth } from "src/utils/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const AppointmentFinder: FC = () => {
  const navigate = useNavigate()
  const clinics: IClinic[] = useLoaderData() as IClinic[];

  const [knowledges, setKnowledges] = useState<IIllness[]>([]);

  useMemo(() => {
    if (clinics && Array.isArray(clinics)) {
      const allKnowledges: IIllness[] = [];
      clinics.forEach((clinic: IClinic) => {
        clinic.docs.forEach((user: IUser) => {
          user.doc.knowledges.forEach((k) => {
            if (!allKnowledges.some((q) => q.name === k.name)) {
              allKnowledges.push(k);
            }
          });
        });
      });

      setKnowledges(allKnowledges);
    }
  }, [clinics]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/')
      }
    })
  }, [auth])

  return (
    <Suspense fallback={<ContentLoading />}>
      <div className={s.container}>
        <FinderForm clinics={clinics} knowledges={knowledges} />
      </div>
    </Suspense>
  );
};

export default AppointmentFinder;
