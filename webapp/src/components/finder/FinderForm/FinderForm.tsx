import React, { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { IAppointmentSlot, IClinic, IIllness, IUser } from "src/models";
import { AppointmentCard, FormCombobox } from "src/components/ui";
import { HiOutlineMap, HiOutlineLocationMarker, HiOutlineUser, HiOutlineInformationCircle, HiOutlineClipboardList } from "react-icons/hi";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { getImageByURL } from "src/utils/firebase/storage";
import { Link } from "react-router-dom";
import { useCalendar } from "src/shared/hooks";
import { DatePicker } from "src/components/calendar";
import { getAppointmentsByDate } from "src/utils/firebase/firestore";
import { MONTHS } from "src/utils/constants";

interface FinderFormProps {
  clinics: IClinic[];
  knowledges: IIllness[];
  doctors: IUser[];
}

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, doctors }) => {
  // const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! });
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const { years, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay } = useCalendar();

  const [selectedProblem, setSelectedProblem] = useState<IIllness>(knowledges[0] || "Select a problem");
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [selectedDoctor, setSelectedDoctor] = useState<IUser>(doctors[0] || "Select a doctor");
  const [availableAppointments, setAvailableAppointments] = useState<IAppointmentSlot[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentSlot | null>(null);
  const [problemQuery, setProblemQuery] = useState<string>("");
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [doctorQuery, setDoctorQuery] = useState<string>("");

  const center = useMemo(() => ({ lat: selectedClinic.geoLocation.lat, lng: selectedClinic.geoLocation.lng }), [selectedClinic]);

  useEffect(() => {
    getAppointmentsByDate(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay)
      .then((res) => setAvailableAppointments(res as IAppointmentSlot[]))
      .catch((err) => console.error(err));
  }, [selectedYear, selectedMonth, selectedDay]);

  const filteredProblems =
    problemQuery === ""
      ? knowledges
      : knowledges.filter((knowledge: IIllness) =>
          knowledge.name.toLowerCase().replace(/\s+/g, "").includes(problemQuery.toLowerCase().replace(/\s+/g, ""))
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
          <div className={s.descriptionContainer}>
            <h3 className="text-2xl font-semibold text-primary dark:text-white">Problem Description</h3>
            <p className="flex flex-wrap max-h-24 text-primary overflow-hidden dark:text-white">{selectedProblem.description}</p>
            {selectedProblem.queryWord && selectedProblem.queryWord !== "" && (
              <a
                className="text-primary transition-all duration-100 hover:text-darkpink dark:text-white dark:hover:text-darkpink"
                target="_blank"
                rel="noreferrer"
                href={`https://google.com/?q=${selectedProblem.queryWord}`}
              >
                Read More...
              </a>
            )}
          </div>
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
            {/*      {isLoaded ? (
              <GoogleMap
                options={{ gestureHandling: "none", streetViewControl: false, fullscreenControl: false }}
                zoom={16}
                center={center}
                mapContainerClassName="flex h-full -mx-4 -mt-4 rounded-t-lg"
              >
                <MarkerF position={center} />
              </GoogleMap>
            ) : (
              <span className={s.mapPlaceholder}>
                <HiOutlineMap className="h-5 w-5 text-primary" />
                &nbsp; Map is loading...
              </span>
            )} */}
            <span
              className={`${s.mapPlaceholder} inline-flex items-center text-primary -mx-4 pt-4 pl-4 border-t border-slate-400 font-semibold cursor-pointer`}
            >
              <HiOutlineMap className="h-5 w-5 text-primary dark:text-white" />
              &nbsp; Map is loading...
            </span>
            <a
              className="inline-flex items-center text-primary -mx-4 pt-4 pl-4 border-t border-slate-400 font-semibold cursor-pointer transition-all duration-100 hover:text-darkpink dark:text-white dark:hover:text-darkpink"
              target="_blank"
              rel="noreferrer"
              href={`https://maps.google.com/?q=${
                selectedClinic.geoLocation.addressLine !== "" ? selectedClinic.geoLocation.addressLine : center.lat + "," + center.lng
              }`}
            >
              <HiOutlineLocationMarker className="h-5 w-5" />
              &nbsp; See on Google Maps
            </a>
          </div>
        </div>

        <div className={s.formSection}>
          <DatePicker
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />

          <div className={s.availableAppointments}>
            {availableAppointments?.length > 0 &&
              availableAppointments.map((appointment: IAppointmentSlot, i: number) => (
                <div key={i} onClick={() => setSelectedAppointment(appointment)}>
                  <AppointmentCard
                    startDate={appointment.startDate}
                    endDate={appointment.endDate}
                    doc={appointment.user}
                    isSelected={appointment.id === selectedAppointment?.id}
                  />
                </div>
              ))}
          </div>

          {!availableAppointments.length && (
            <div className="flex h-full w-full justify-center items-center space-x-2">
              <HiOutlineClipboardList className="h-6 w-6" />
              <p className="text-lg font-semibold whitespace-nowrap">No available Appointments</p>
            </div>
          )}
        </div>

        <div className={s.formFields}>
          <div className={s.formField}>
            <label>First Name</label>
            <input type="text" {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
            {errors.firstName?.type === "required" && <p>error</p>}
          </div>

          <div className={s.formField}>
            <label>Last Name</label>
            <input type="text" {...register("lastName", { required: true })} aria-invalid={errors.lastName ? "true" : "false"} />
            {errors.lastName?.type === "required" && <p>error</p>}
          </div>

          <div className={s.formField}>
            <label>Email</label>
            <input type="text" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
            {errors.email?.type === "required" && <p>error</p>}
          </div>

          <div className={s.formField}>
            <label>Phone (optional)</label>
            <input type="text" {...register("phone", { required: false })} aria-invalid={errors.phone ? "true" : "false"} />
            {errors.phone?.type === "required" && <p>error</p>}
          </div>

          <div className={s.formField}>
            <label>TAJ Number</label>
            <input type="text" {...register("taj", { required: true })} aria-invalid={errors.taj ? "true" : "false"} />
            {errors.taj?.type === "required" && <p>error</p>}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FinderForm;
