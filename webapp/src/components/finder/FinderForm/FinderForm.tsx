import { Combobox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { HiOutlineChevronDown, HiOutlineCheck } from "react-icons/hi";
import { IClinic, IUser } from "src/models";
import { FormCombobox } from "src/components/ui";

interface FinderFormProps {
  clinics: IClinic[];
  knowledges: string[];
  doctors: IUser[];
}

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, doctors }) => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const [selectedProblem, setSelectedProblem] = useState<string>(knowledges[0] || "Select a problem");
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [selectedDoctor, setSelectedDoctor] = useState<IUser>(doctors[0] || "Select a doctor");
  const [problemQuery, setProblemQuery] = useState<string>("");
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [doctorQuery, setDoctorQuery] = useState<string>("");

  const filteredProblems =
    problemQuery === ""
      ? knowledges
      : knowledges.filter((knowledges: string) =>
          knowledges.toLowerCase().replace(/\s+/g, "").includes(problemQuery.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredClinics =
    clinicQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(clinicQuery.toLowerCase().replace(/\s+/g, "")));

  const filteredDoctors =
    doctorQuery === ""
      ? doctors
      : doctors.filter((doctor: IUser) =>
          `${doctor.firstName} ${doctor.lastName}`.toLowerCase().replace(/\s+/g, "").includes(doctorQuery.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className={s.container}>
      <form>
        <FormCombobox
          state={selectedProblem}
          setState={setSelectedProblem}
          query={problemQuery}
          setQuery={setProblemQuery}
          items={filteredProblems}
          label={"What's the problem?"}
        />

        <FormCombobox
          state={selectedClinic}
          setState={setSelectedClinic}
          query={clinicQuery}
          setQuery={setClinicQuery}
          items={filteredClinics}
          label={"Choose a clinic"}
        />

        <FormCombobox
          state={selectedDoctor}
          setState={setSelectedDoctor}
          query={doctorQuery}
          setQuery={setDoctorQuery}
          items={filteredDoctors}
          label={"Choose your doctor"}
        />
      </form>
    </div>
  );
};

export default FinderForm;
