import { FC, Fragment, Suspense, useCallback, useEffect, useState } from "react";
import { IAppointmentSlot } from "src/models";
import { HOURSFORMAT, MONTHS } from "src/utils/constants";
import s from "./CurrentDay.module.scss";
import { HiOutlineClipboardList, HiOutlineDotsVertical, HiOutlineTrash, HiOutlineCheck } from "react-icons/hi";
import { deleteDocAppointment, getDocAppointments, getUserById } from "src/utils/firebase/firestore";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import { ContentLoading } from "src/components/common";
//import { useTranslation } from "react-i18next";
import confirmDocAppointment from "src/utils/firebase/firestore/confirm-doc-appointment";

interface ICurrentDayProps extends StateProps, DispatchProps {
  selectedYear: number;
  selectedMonth: string;
  selectedDay: number;
  isLoading: boolean;
  setIsLoading: (item: boolean) => void;
}

const CurrentDay: FC<ICurrentDayProps> = ({ auth, selectedYear, selectedMonth, selectedDay, setIsLoading }) => {
  //const { t } = useTranslation();

  const [appointmentSlots, setAppointmentSlots] = useState<IAppointmentSlot[] | null>(null);
  const [currentAppointmentSlot, setCurrentAppointmentSlot] = useState<IAppointmentSlot | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  const serializeAppointments = useCallback(async (): Promise<void> => {
    if (auth.account?.uid) {
      setIsLoading(true);
      const appointments = await getDocAppointments(auth.account?.uid);
      if (appointments?.length) {
        const filtered = appointments.filter(
          ({ startDate }) => {
            return startDate.getFullYear() === selectedYear && startDate.getMonth() === MONTHS.findIndex((m) => m === selectedMonth) && startDate.getDate() === selectedDay
          });

        const appended = await Promise.all(filtered.map(async (item) => {
          const patient_data = await getUserById(item.patient)
          return {
            ...item,
            patient: {
              id: item.patient,
              ...patient_data
            }
          }
        }))

        setAppointmentSlots(appended);
      } else {
        setAppointmentSlots(null);
      }
      setIsLoading(false);
    }
  }, [auth, selectedDay, selectedMonth, selectedYear, setIsLoading]);

  useEffect(() => {
    serializeAppointments();
  }, [serializeAppointments]);

  const confirmAppointment = async (id: string): Promise<void> => {
    try {
      if (currentAppointmentSlot) {
        setIsLoading(true);
        await confirmDocAppointment(id);
        setIsConfirmModalOpen(false);
        await serializeAppointments();
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id: string): Promise<void> => {
    try {
      if (currentAppointmentSlot) {
        setIsLoading(true);
        await deleteDocAppointment(id);
        setIsDeleteModalOpen(false);
        await serializeAppointments();
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openDeleteAppointmentModal = (appointment: IAppointmentSlot): void => {
    setIsDeleteModalOpen(true);
    console.log(appointment)
    setCurrentAppointmentSlot(appointment);
  };

  const openConfirmAppointmentModal = (appointment: IAppointmentSlot): void => {
    setIsConfirmModalOpen(true);
    setCurrentAppointmentSlot(appointment);
  };

  /**
   * If the end hour is greater than the start hour, then the height of the appointment slot is the difference between the end minutes and the start minutes plus the difference between the end hours and the start hours multiplied by 60.
   * Otherwise, the height of the appointment slot is the difference between the end minutes and the start minutes.
   * @param {IAppointmentSlot} item - IAppointmentSlot - this is the item that is being rendered.
   * @returns The height of the appointment slot in pixels.
   */
  const calculateItemHeight = (item: IAppointmentSlot): string => {
    if (item.endDate.getHours() > item.startDate.getHours()) {
      return `${item.endDate.getMinutes() - item.startDate.getMinutes() + (item.endDate.getHours() - item.startDate.getHours()) * 60}px`;
    } else {
      return `${item.endDate.getMinutes() - item.startDate.getMinutes()}px`;
    }
  };

  /**
   * It takes an object of type IAppointmentSlot, and returns a time string.
   * @param {IAppointmentSlot} item - IAppointmentSlot - this is the item that is being rendered.
   * @returns A string with the start and end time of the appointment slot.
   */
  const renderTime = (item: IAppointmentSlot): string => {
    const { startDate, endDate } = item;

    return `${startDate.getHours() < 10 ? "0" + startDate.getHours() : startDate.getHours()}:${startDate.getMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes()
      } - ${endDate.getHours() < 10 ? "0" + endDate.getHours() : endDate.getHours()}:${endDate.getMinutes() < 10 ? "0" + endDate.getMinutes() : endDate.getMinutes()
      }`;
  };
  //const findClinicColor = (clinicName: string): string => `${auth.account?.doc?.clinics?.find((q) => q.clinicName === clinicName)?.color}`;

  return (
    <>
      <Suspense fallback={<ContentLoading />}>
        <div className={s.container}>
          {/*<button onClick={() => setIsAppointmentModalOpen(true)}>
            <HiOutlinePlusSm className="h-5 w-5" />
            &nbsp;{t("current_day.add")}
          </button>*/}

          <div className={s.timeSlotsContainer}>
            {HOURSFORMAT.slice(8, 17).map((time, i) => (
              <div key={i} className={s.timeSlot}>
                <span>{time}</span>
                {appointmentSlots
                  ?.filter((slot) => slot.startDate.getHours() === +time.split(":")[0])
                  ?.map((item, i) => (
                    <div
                      key={i}
                      className={`${(item.confirmed) ? s.appointmentConfirmed : s.appointment} ${+calculateItemHeight(item).substring(0, calculateItemHeight(item).length - 2) < 30 && "text-xs"
                        }`}
                      style={{
                        top: item.startDate.getMinutes() + "px",
                        height: calculateItemHeight(item),
                      }}
                    >
                      <div
                        className={s.content}
                      >
                        <HiOutlineClipboardList
                          className={`${+calculateItemHeight(item).substring(0, calculateItemHeight(item).length - 2) < 30 ? "hidden" : "block h-6 w-6"
                            }`}
                        />
                        <p>&nbsp;{(item.patient && item.patient.firstName && item.patient.lastName) ? item.patient.firstName + " " + item.patient.lastName : item.patient.id}</p>
                        <span>&nbsp;&nbsp;({renderTime(item)})</span>
                      </div>
                      <Menu as="div" className={s.menu}>
                        <div>
                          <Menu.Button className={s.menuButton}>
                            <HiOutlineDotsVertical className={"text-4xl ml-2 -mr-1 h-5 w-5 " + (item.confirmed ? "text-teal-700" : "text-amber-900")} aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className={s.menuItems}>
                            <div className="px-1 py-1">
                              {!item.confirmed && <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-slate-100 text-primary" : "text-primary"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => openConfirmAppointmentModal(item)}
                                  >
                                    <HiOutlineCheck className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Elfogadás
                                  </button>
                                )}
                              </Menu.Item>}

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-slate-100 text-primary" : "text-primary"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => openDeleteAppointmentModal(item)}
                                  >
                                    <HiOutlineTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Törlés
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ))}
                <div className={s.timeSlotsDividers}>
                  <span></span>
                  <span style={(i === 8) ? { borderColor: 'transparent' } : {}}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>

      {isConfirmModalOpen && (
        <ConfirmModal
          text={"Biztosan megerősíti a foglalást?"}
          item={currentAppointmentSlot?.id}
          submitButtonText={"Igen"}
          cancelButtonText={"Mégsem"}
          cancel={setIsConfirmModalOpen}
          submit={confirmAppointment}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          text={"Biztosan törli a foglalást?"}
          item={currentAppointmentSlot?.id}
          submitButtonText={"Igen"}
          cancelButtonText={"Mégsem"}
          cancel={setIsDeleteModalOpen}
          submit={deleteAppointment}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CurrentDay);
