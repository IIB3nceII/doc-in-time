import React, { FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { IClinic, IUser } from "src/models";
import { FormCombobox } from "src/components/ui";
import { HiOutlineMap, HiOutlineLocationMarker } from "react-icons/hi";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

interface FinderFormProps {
  clinics: IClinic[];
  knowledges: string[];
  doctors: IUser[];
}

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, doctors }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! });
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

  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

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
        <div className={s.formSection}>
          <FormCombobox
            state={selectedProblem}
            setState={setSelectedProblem}
            query={problemQuery}
            setQuery={setProblemQuery}
            items={filteredProblems}
            label={"What's the problem?"}
          />
          <p className={s.problemDescription}>{selectedProblem}</p>
        </div>

        <div className={s.formSection}>
          <FormCombobox
            state={selectedClinic}
            setState={setSelectedClinic}
            query={clinicQuery}
            setQuery={setClinicQuery}
            items={filteredClinics}
            label={"Choose a clinic"}
          />

          <div className={s.mapContainer}>
            {isLoaded ? (
              <GoogleMap zoom={10} center={center} mapContainerClassName="flex h-full -mx-4 -mt-4 rounded-t-lg"></GoogleMap>
            ) : (
              <span className={s.mapPlaceholder}>
                <HiOutlineMap className="h-5 w-5 text-primary" />
                &nbsp; Map is loading...
              </span>
            )}
            <span>
              <HiOutlineLocationMarker className="h-5 w-5 text-primary" />
              &nbsp; See on Google Maps
            </span>
          </div>
        </div>

        <div className={s.formSection}>
          <FormCombobox
            state={selectedDoctor}
            setState={setSelectedDoctor}
            query={doctorQuery}
            setQuery={setDoctorQuery}
            items={filteredDoctors}
            label={"Choose your doctor"}
          />
        </div>
      </form>
    </div>
  );
};

export default FinderForm;
