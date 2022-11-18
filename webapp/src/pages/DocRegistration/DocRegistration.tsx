import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import s from "./DocRegistration.module.scss";
import { IClinic, IAppointmentFormData } from "src/models";
import { FormCombobox } from "src/components/ui";
import { useForm } from "react-hook-form";

interface DocRegistrationProps {
  clinics: IClinic[];
}

const DocRegistration: FC<DocRegistrationProps> = ({ clinics }) => {
  const {
    formState: { errors },
  } = useForm<IAppointmentFormData>({
    defaultValues: {
      selectedClinic: clinics[0],
    },
  });
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [clinicQuery, setClinicQuery] = useState<string>("");

  const filteredClinics =
    clinicQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(clinicQuery.toLowerCase().replace(/\s+/g, "")));

  return <div className={s.selection}>
    <div className={s.clinicchooser}>
      <FormCombobox
        state={selectedClinic}
        setState={setSelectedClinic}
        query={clinicQuery}
        setQuery={setClinicQuery}
        items={filteredClinics}
        label={"Choose your clinic!"}
      />
    </div>
    <div className={s.cancel}>
      <Link to="/edit-profile">Cancel</Link>
    </div>
    <button type="submit" > Submit </button>
  </div>;

  //{submitModalOpen && <ConfirmModal item={getValues()} cancel={setSubmitModalOpen} submit={createNewReservation} />}
};

export default DocRegistration;
