import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { IAppointmentFormData, IAppointmentSlot, IClinic, IIllness, IUser } from "src/models";
import { AppointmentCard, FormCombobox } from "src/components/ui";
import { HiOutlineMap, HiOutlineLocationMarker, HiOutlineClipboardList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCalendar } from "src/shared/hooks";
import { DatePicker } from "src/components/calendar";
import { getAppointmentsByDate, reserveAppointment } from "src/utils/firebase/firestore";
import { MONTHS } from "src/utils/constants";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "src/utils/firebase/firebase.config";
import { getImageByURL } from "src/utils/firebase/storage";

interface FinderFormProps extends StateProps, DispatchProps {
  clinics: IClinic[];
  knowledges: IIllness[];
  doctors: IUser[];
}

const appointmentSlots = [
  {
    id: 1,
    startTime: "08:00:00",
    endTime: "08:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 2,
    startTime: "08:30:00",
    endTime: "09:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 3,
    startTime: "09:00:00",
    endTime: "09:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 4,
    startTime: "09:30:00",
    endTime: "10:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 5,
    startTime: "10:00:00",
    endTime: "10:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 6,
    startTime: "10:30:00",
    endTime: "11:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 7,
    startTime: "11:00:00",
    endTime: "11:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 8,
    startTime: "11:30:00",
    endTime: "12:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 9,
    startTime: "12:00:00",
    endTime: "12:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 10,
    startTime: "12:30:00",
    endTime: "13:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 11,
    startTime: "13:00:00",
    endTime: "13:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 12,
    startTime: "13:30:00",
    endTime: "14:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 13,
    startTime: "14:00:00",
    endTime: "14:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 14,
    startTime: "14:30:00",
    endTime: "15:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 15,
    startTime: "15:00:00",
    endTime: "15:30:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
  {
    id: 16,
    startTime: "15:30:00",
    endTime: "16:00:00",
    doc: "FhKGFkGxvqZnrDEBSyGXe5gqZGI2"
  },
]

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, doctors, auth }) => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  // const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! });
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IAppointmentFormData>({
    defaultValues: {
      selectedProblem: knowledges[0],
      selectedClinic: clinics[0],
      selectedAppointment: null,
    },
  });

  const { years, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay } = useCalendar();

  const [appointmentSlots, setAppointmentSlots] = useState<object[]>([])
  const [selectedProblem, setSelectedProblem] = useState<IIllness>(knowledges[0] || "Select a problem");
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0] || "Select a clinic");
  const [unavailableAppointments, setUnavailableAppointments] = useState<IAppointmentSlot[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentSlot | null>(null);
  const [customAppointmentError, setCustomAppointmentError] = useState<string | null>(null);
  const [problemQuery, setProblemQuery] = useState<string>("");
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const center = useMemo(() => ({ lat: selectedClinic.geoLocation.lat, lng: selectedClinic.geoLocation.lng }), [selectedClinic]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await getDocs(query(collection(db, "defaultAppointmentSlots")))

      const data: object[] = []
      res.forEach(async (item) => {
        const d = item.data()
        const dc = await getDoc(doc(db, 'users', d.doc))
        const doc_data = dc.data()
        if (doc_data) {
          doc_data['imageUrl'] = await getImageByURL(doc_data.imageUrl)
        }
        data.push({ id: item.id, ...d, doc: doc_data })
      })
      setAppointmentSlots(data)
    }
    getData()
    setInterval(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    getAppointmentsByDate(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay)
      .then((res) => {
        if (res) {
          const filtered_res = res.filter(item => item.isReserved)
          setUnavailableAppointments(filtered_res as IAppointmentSlot[])
        }
      })
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

  const handleAppointmentChange = (appointment: any/*IAppointmentSlot*/): void => {
    setSelectedAppointment(appointment);
    setValue("selectedAppointment", appointment);
  };

  const onSubmitAppointmentForm = (): void => {
    if (!selectedAppointment) {
      setCustomAppointmentError("An appointment must be selected!");
    } else {
      setSubmitModalOpen(true);
    }
  };

  const createNewReservation = async (item: IAppointmentFormData): Promise<void> => {
    try {
      if (item.selectedAppointment?.id && auth?.account?.uid) {
        await reserveAppointment(item.selectedAppointment.id, auth?.account?.uid);

        navigation("/appointment-reservation");
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(loading)

  return (
    <>
      <div className={s.container}>
        <form onSubmit={handleSubmit(onSubmitAppointmentForm)}>
          <div className={s.formSection}>
            <FormCombobox
              state={selectedProblem}
              setState={setSelectedProblem}
              query={problemQuery}
              setQuery={setProblemQuery}
              items={filteredProblems}
              label={`${t("finder.card_1.title")}`}
            />
            <div className={s.descriptionContainer}>
              <h3 className="text-2xl font-semibold text-primary dark:text-white">{t("finder.card_1.description.title")}</h3>
              <p className="flex flex-wrap max-h-24 text-primary overflow-hidden dark:text-white">{selectedProblem.description}</p>
              {selectedProblem.queryWord && selectedProblem.queryWord !== "" && (
                <a
                  className="text-primary transition-all duration-100 hover:text-darkpink dark:text-white dark:hover:text-darkpink"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://google.com/?q=${selectedProblem.queryWord}`}
                >
                  {t("finder.card_1.description.link")}
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
              label={`${t("finder.card_2.title")}`}
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
                &nbsp; {t("finder.card_2.loading")}
              </span>
              <a
                className="inline-flex items-center text-primary -mx-4 pt-4 pl-4 border-t border-slate-400 font-semibold cursor-pointer transition-all duration-100 hover:text-darkpink dark:text-white dark:hover:text-darkpink"
                target="_blank"
                rel="noreferrer"
                href={`https://maps.google.com/?q=${selectedClinic.geoLocation.addressLine !== "" ? selectedClinic.geoLocation.addressLine : center.lat + "," + center.lng
                  }`}
              >
                <HiOutlineLocationMarker className="h-5 w-5" />
                &nbsp; {t("finder.card_2.maps")}
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

            <div className={s.availableAppointments} style={{ margin: 0 }}>
              {/*unavailableAppointments?.length > 0 ?
                unavailableAppointments.map((appointment: IAppointmentSlot, i: number) => (
                  <div key={i} onClick={() => handleAppointmentChange(appointment)}>
                    <AppointmentCard
                      startDate={appointment.startDate}
                      endDate={appointment.endDate}
                      doc={appointment.doc}
                      isSelected={appointment.id === selectedAppointment?.id}
                    />
                  </div>
                ))
                :
                (
                  <div className="flex h-full w-full justify-center items-center space-x-2">
                    <HiOutlineClipboardList className="h-6 w-6" />
                    <p className="text-lg font-semibold whitespace-nowrap">{t("finder.card_3.no_app")}</p>
                  </div>
                )*/}
              {loading
                ? (
                  <div className="flex h-full w-full justify-center items-center space-x-2">
                    <HiOutlineClipboardList className="h-6 w-6" />
                    <p className="text-lg font-semibold whitespace-nowrap">{t("finder.card_3.no_app")}</p>
                  </div>
                )
                : (appointmentSlots.map((item: any, ind: number) => {
                  let is_unavailable = false
                  if (unavailableAppointments) {
                    is_unavailable = unavailableAppointments.filter(subitem => {
                      const date1 = subitem.startDate.getTime().toString()
                      const date2 = new Date(selectedYear + '-' + (MONTHS.findIndex((m) => m === selectedMonth) + 1) + '-' + ((selectedDay < 10) ? '0' + selectedDay : selectedDay) + "T" + item.startTime).getTime().toString()

                      return date1.substring(0, date1.length - 3) === date2.substring(0, date2.length - 3)
                    }).length > 0
                  }
                  if (is_unavailable) {
                    return null
                  }

                  const month = MONTHS.findIndex((m) => m === selectedMonth) + 1

                  return (
                    <div key={ind} onClick={() => handleAppointmentChange(item)}>
                      <AppointmentCard
                        startDate={new Date(selectedYear + '-' + ((month < 10) ? '0' + month : month) + '-' + ((selectedDay < 10) ? '0' + selectedDay : selectedDay) + "T" + item.startTime)}
                        endDate={new Date(selectedYear + '-' + ((month < 10) ? '0' + month : month) + '-' + ((selectedDay < 10) ? '0' + selectedDay : selectedDay) + "T" + item.endTime)}
                        doc={item.doc}
                        isSelected={item.id === selectedAppointment?.id}
                      />
                    </div>
                  )
                }))
              }
            </div>
          </div>

          <div className={s.formFields}>
            <div className={s.formField}>
              <label>{t("finder.form.first_name")}</label>
              <input type="text" {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
              {errors.firstName?.type === "required" && <p>error</p>}
            </div>

            <div className={s.formField}>
              <label>{t("finder.form.last_name")}</label>
              <input type="text" {...register("lastName", { required: true })} aria-invalid={errors.lastName ? "true" : "false"} />
              {errors.lastName?.type === "required" && <p>error</p>}
            </div>

            <div className={s.formField}>
              <label>{t("finder.form.email")}</label>
              <input type="text" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
              {errors.email?.type === "required" && <p>error</p>}
            </div>

            <div className={s.formField}>
              <label>{t("finder.form.phone")}</label>
              <input type="text" {...register("phone", { required: false })} aria-invalid={errors.phone ? "true" : "false"} />
              {errors.phone?.type === "required" && <p>error</p>}
            </div>

            <div className={s.formField}>
              <label>{t("finder.form.taj")}</label>
              <input type="text" {...register("taj", { required: true })} aria-invalid={errors.taj ? "true" : "false"} />
              {errors.taj?.type === "required" && <p>error</p>}
            </div>
          </div>

          <button type="submit">{t("finder.form.submit")}</button>
        </form>
      </div>
      {submitModalOpen && <ConfirmModal item={getValues()} cancel={setSubmitModalOpen} submit={createNewReservation} />}
    </>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FinderForm);
