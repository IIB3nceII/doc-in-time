import React, { FC, Suspense, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ContentLoading } from "src/components/common";
import { FinderForm } from "src/components/finder";
import { IClinic, IUser } from "src/models";
import s from "./AppointmentFinder.module.scss";

const AppointmentFinder: FC = () => {
  const clinics: IClinic[] = useLoaderData() as IClinic[];

  const [knowledges, setKnowledges] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<IUser[]>([]);

  useMemo(() => {
    if (clinics && Array.isArray(clinics)) {
      const allKnowledges: string[] = [];
      const dArr: IUser[] = [];
      clinics.forEach((clinic: IClinic) => {
        clinic.docs.forEach((user: IUser) => {
          console.log(user);
          dArr.push(user);
          user.doc.knowledges.forEach((k) => {
            allKnowledges.push(k);
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
