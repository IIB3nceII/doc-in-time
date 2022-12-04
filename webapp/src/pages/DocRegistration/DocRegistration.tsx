import React, { FC, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import s from "./DocRegistration.module.scss";
import { IClinic, IAppointmentFormData, IRegisterFormData } from "src/models";
import { FormCombobox } from "src/components/ui";
import { useForm } from "react-hook-form";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import IDocRegisterFormData from "src/models/doctor-registration-form-data-model";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";

interface DocRegistrationProps extends StateProps, DispatchProps{
  
}

const DocRegistration: FC<DocRegistrationProps> = ({auth}) => {

  const clinics: IClinic[] = useLoaderData() as IClinic[];

  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [clinicQuery, setClinicQuery] = useState<string>("");

  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IDocRegisterFormData>({
    defaultValues: {
      selectedClinic: clinics[0],
    },
  });

  const filteredClinics =
    clinicQuery === ""
      ? clinics
      : clinics.filter((clinic: IClinic) => clinic.name.toLowerCase().replace(/\s+/g, "").includes(clinicQuery.toLowerCase().replace(/\s+/g, "")));

  
  const createNewDocReg = async (item: IDocRegisterFormData): Promise<void> => {
    try {
      console.log(item);
      if (auth?.account?.uid) {
        // TODO hova kell küldeni
        alert("Application submitted");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return(
  <div>
    <form onSubmit={handleSubmit(createNewDocReg)}>
      <div className={s.selection}>
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
      </div>
    </form>
  </div>
  )

};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocRegistration);

