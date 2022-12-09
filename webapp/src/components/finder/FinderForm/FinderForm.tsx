import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import s from "./FinderForm.module.scss";
import { IAppointmentFormData, IAppointmentSlot, IClinic, IIllness } from "src/models";
import { AppointmentCard, FormCombobox } from "src/components/ui";
import { HiOutlineMap, HiOutlineLocationMarker, HiOutlineClipboardList } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCalendar } from "src/shared/hooks";
import { DatePicker } from "src/components/calendar";
import { addNewAppointment, getAppointmentsByDate } from "src/utils/firebase/firestore";
import { MONTHS } from "src/utils/constants";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "src/utils/firebase/firebase.config";
import { IUserData } from "src/models/user.model";
import { registerUserWithTajNumberWithoutSignin } from "src/shared/store/actions/auth.action";

interface FinderFormProps extends StateProps, DispatchProps {
  clinics: IClinic[];
  knowledges: IIllness[];
}

const FinderForm: FC<FinderFormProps> = ({ clinics, knowledges, auth }) => {
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

  const [allPatients, setAllPatients] = useState<IUserData[]>([])
  const [appointmentSlots, setAppointmentSlots] = useState<object[]>([])
  const [selectedProblem, setSelectedProblem] = useState<IIllness>(knowledges[0]);
  const [selectedClinic, setSelectedClinic] = useState<IClinic>(clinics[0]);
  const [unavailableAppointments, setUnavailableAppointments] = useState<IAppointmentSlot[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointmentSlot | null>(null);
  //const [customAppointmentError, setCustomAppointmentError] = useState<string | null>(null);
  const [problemQuery, setProblemQuery] = useState<string>("");
  const [clinicQuery, setClinicQuery] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const center = useMemo(() => ({ lat: selectedClinic.geoLocation.lat, lng: selectedClinic.geoLocation.lng }), [selectedClinic]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await getDocs(query(collection(db, "users")))
      const data: object[] = []
      const patient_data: IUserData[] = []
      res.forEach(async (item) => {
        const d = item.data()
        if (d.isDoc) {
          if (d.doc.clinics && d.doc.clinics.filter((clinic: any) => clinic.clinicId === selectedClinic.id).length > 0) {
            if (d.doc.knowledges && d.doc.knowledges.includes(selectedProblem.id)) {
              const doc_ranges = d.doc.ranges
              if (doc_ranges) {
                const selected_date = new Date(selectedYear + "-" + selectedMonth + "-" + selectedDay)
                let startTime = '00:00:00'
                let endTime = '00:00:00'
                switch (selected_date.getDay()) {
                  case 1:
                    startTime = doc_ranges.monday_startTime
                    endTime = doc_ranges.monday_endTime
                    break;
                  case 2:
                    startTime = doc_ranges.tuesday_startTime
                    endTime = doc_ranges.tuesday_endTime
                    break;
                  case 3:
                    startTime = doc_ranges.wednesday_startTime
                    endTime = doc_ranges.wednesday_endTime
                    break;
                  case 4:
                    startTime = doc_ranges.thursday_startTime
                    endTime = doc_ranges.thursday_endTime
                    break;
                  case 5:
                    startTime = doc_ranges.friday_startTime
                    endTime = doc_ranges.friday_endTime
                    break;
                  default:
                    break;
                }
                const startDate = new Date(selected_date)
                startDate.setHours(+startTime.split(':')[0])
                startDate.setMinutes(+startTime.split(':')[1])
                startDate.setSeconds(+startTime.split(':')[2])
                const endDate = new Date(selected_date)
                endDate.setHours(+endTime.split(':')[0])
                endDate.setMinutes(+endTime.split(':')[1])
                endDate.setSeconds(+endTime.split(':')[2])

                const range = (doc_ranges.range * 60 * 1000)
                const slots_count = Math.floor((endDate.getTime() - startDate.getTime()) / range)

                for (let i = 0; i < slots_count; i++) {
                  data.push({
                    id: item.id + i,
                    startDate: new Date(startDate.getTime() + (range * i)),
                    endDate: new Date(startDate.getTime() + (range * (i + 1))),
                    doc: {
                      ...d,
                      uid: item.id
                    }
                  })
                }
              }
            }
          }
        }
        else {
          patient_data.push({
            uid: item.id,
            firstName: d.firstName,
            lastName: d.lastName,
            email: d.email,
            isDoc: d.isDoc,
            doc: d.doc,
            tajNumber: d.tajNumber
          })
        }
      })
      setAppointmentSlots(data)
      setAllPatients(patient_data)
    }
    getData()
    setInterval(() => {
      setLoading(false)
    }, 2000)
  }, [selectedYear, selectedMonth, selectedDay, selectedClinic, selectedProblem, setAllPatients])

  useEffect(() => {
    const month = MONTHS.findIndex((m) => m === selectedMonth) + 1
    getAppointmentsByDate(selectedYear + '-' + ((month < 10) ? '0' + month : month) + '-' + ((selectedDay < 10) ? '0' + selectedDay : selectedDay))
      .then((res) => {
        if (res) {
          setUnavailableAppointments(res as IAppointmentSlot[])
        }
      })
      .catch((err) => console.error(err));
  }, [selectedYear, selectedMonth, selectedDay]);

  const setDataByTajNumber = (taj_number: string) => {
    const current = allPatients.filter((item) => item.tajNumber === taj_number)[0]

    if (current) {
      if (current.firstName) {
        setValue('firstName', current.firstName)
      }
      if (current.lastName) {
        setValue('lastName', current.lastName)
      }
      if (current.email) {
        setValue('email', current.email)
      }
      if (current.phoneNumber) {
        setValue('phone', current.phoneNumber)
      }
    }
    else {
      setValue('firstName', '')
      setValue('lastName', '')
      setValue('email', '')
      setValue('phone', '')
    }
  }

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

  const createNewReservation = async (item: IAppointmentFormData): Promise<void> => {
    try {
      if (item.selectedAppointment?.id && auth?.account?.uid) {
        let uid = ""
        if (auth.account.isDoc) {
          let current_user = allPatients.filter((subitem) => subitem.tajNumber === item.tajNumber)[0]
          if (!current_user) {
            uid = await registerUserWithTajNumberWithoutSignin({
              firstName: item.firstName,
              lastName: item.lastName,
              email: item.email,
              isDoc: false,
              doc: {},
              tajNumber: item.tajNumber,
              phoneNumber: item.phone
            }) || ""
          }
          else {
            uid = current_user.uid || ""
          }
        }
        else {
          uid = auth.account.uid
          if (!auth.account.firstName && auth.account.firstName === "") {
            await updateDoc(doc(db, "users", auth.account.uid), {
              firstName: item.firstName
            });
          }
          if (!auth.account.lastName && auth.account.lastName === "") {
            await updateDoc(doc(db, "users", auth.account.uid), {
              lastName: item.lastName
            });
          }
          if (!auth.account.email && auth.account.email === "") {
            await updateDoc(doc(db, "users", auth.account.uid), {
              email: item.email
            });
          }
          if (!auth.account.phoneNumber && auth.account.phoneNumber === "") {
            await updateDoc(doc(db, "users", auth.account.uid), {
              phoneNumber: item.phone
            });
          }
        }
        await addNewAppointment({
          doc: item.selectedAppointment.doc.uid,
          startDate: item.selectedAppointment.startDate,
          endDate: item.selectedAppointment.endDate,
          confirmed: false,
          problem: item.selectedProblem.id,
          patient: uid,
          clinic: item.selectedClinic.id,
        });

        //navigation("/appointment-reservation");
        alert('Sikeres foglalás')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={s.container}>
        <form onSubmit={handleSubmit(createNewReservation)}>
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
              {loading
                ? (
                  <div className="flex h-full w-full justify-center items-center space-x-2">
                    <p className="text-lg font-semibold whitespace-nowrap">{t("finder.card_3.get_app")}</p>
                  </div>
                )
                : appointmentSlots.length > 0
                  ? (appointmentSlots.map((item: any, ind: number) => {
                    let is_unavailable = false
                    if (unavailableAppointments) {
                      is_unavailable = unavailableAppointments.filter(subitem => {
                        const date1 = subitem.startDate.getTime().toString()
                        const date2 = item.startDate.getTime().toString()

                        return date1.substring(0, date1.length - 3) === date2.substring(0, date2.length - 3)
                      }).length > 0
                    }
                    if (is_unavailable) {
                      return null
                    }

                    return (
                      <div key={ind} onClick={() => handleAppointmentChange(item)}>
                        <AppointmentCard
                          startDate={item.startDate}
                          endDate={item.endDate}
                          doc={item.doc}
                          isSelected={item.id === selectedAppointment?.id}
                        />
                      </div>
                    )
                  }))
                  : (
                    <div className="flex h-full w-full justify-center items-center space-x-2">
                      <HiOutlineClipboardList className="h-6 w-6" />
                      <p className="text-lg font-semibold whitespace-nowrap">{t("finder.card_3.no_app")}</p>
                    </div>
                  )
              }
            </div>
          </div>

          {(auth.account?.isDoc) ?
            <>
              <div className={s.formFields}>
                <div className={s.formField}>
                  <label>{t("finder.form.taj")}*</label>
                  <input type="text" {...register("tajNumber", { required: true })} aria-invalid={errors.tajNumber ? "true" : "false"} onChange={(e) => { setDataByTajNumber(e.target.value) }} />
                  {errors.tajNumber?.type === "required" && <p>error</p>}
                </div>

                <div className={s.formField}>
                  <label>{t("finder.form.phone")}</label>
                  <input type="text" {...register("phone", { required: false })} aria-invalid={errors.phone ? "true" : "false"} />
                  {errors.phone?.type === "required" && <p>error</p>}
                </div>

                <div className={s.formField}>
                  <label>{t("finder.form.first_name")}</label>
                  <input type="text" {...register("firstName", { required: false })} aria-invalid={errors.firstName ? "true" : "false"} />
                  {errors.firstName?.type === "required" && <p>error</p>}
                </div>

                <div className={s.formField}>
                  <label>{t("finder.form.last_name")}</label>
                  <input type="text" {...register("lastName", { required: false })} aria-invalid={errors.lastName ? "true" : "false"} />
                  {errors.lastName?.type === "required" && <p>error</p>}
                </div>

                <div className={s.formField}>
                  <label>{t("finder.form.email")}</label>
                  <input type="text" {...register("email", { required: false })} aria-invalid={errors.email ? "true" : "false"} />
                  {errors.email?.type === "required" && <p>error</p>}
                </div>

                <div className={s.formField}>
                  <label>{t("finder.form.desc")}</label>
                  <input type="text" {...register("desc", { required: false })} aria-invalid={errors.desc ? "true" : "false"} />
                  {errors.desc?.type === "required" && <p>error</p>}
                </div>
              </div>
            </>
            : null}

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
