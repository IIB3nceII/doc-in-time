import React, { FC, Suspense, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ContentLoading } from "src/components/common";
import { FinderForm } from "src/components/finder";
import { IClinic, IIllness, IUser } from "src/models";
import s from "./AppointmentFinder.module.scss";

const AppointmentFinder: FC = () => {
  const clinics: IClinic[] = useLoaderData() as IClinic[];

  const [knowledges, setKnowledges] = useState<IIllness[]>([]);
  const [doctors, setDoctors] = useState<IUser[]>([]);

  useMemo(() => {
    if (clinics && Array.isArray(clinics)) {
      const allKnowledges: IIllness[] = [];
      const dArr: IUser[] = [];
      clinics.forEach((clinic: IClinic) => {
        clinic.docs.forEach((user: IUser) => {
          dArr.push({ ...user, fullName: `${user.firstName} ${user.lastName}` });
          user.doc.knowledges.forEach((k) => {
            if (!allKnowledges.some((q) => q.name === k.name)) {
              allKnowledges.push(k);
            }
          });
        });
      });

      setDoctors(dArr);
      setKnowledges(allKnowledges);
    }
  }, [clinics]);

  return (
    <Suspense fallback={<ContentLoading />}>
      <div className={s.container}>
        <FinderForm clinics={clinics} knowledges={knowledges} doctors={doctors} />
      </div>
    </Suspense>
  );
};

export default AppointmentFinder;
