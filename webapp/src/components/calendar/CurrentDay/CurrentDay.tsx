import { FC, Fragment, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IAppointmentSlot, ITimeSlotFormData } from "src/models";
import { HOURSFORMAT, MONTHS } from "src/utils/constants";
import s from "./CurrentDay.module.scss";
import { HiOutlinePlusSm, HiOutlineClipboardList, HiOutlineDotsVertical, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { addNewAppointment, deleteDocAppointment, editDocAppointment, getDocAppointments } from "src/utils/firebase/firestore";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import ConfirmModal from "src/components/ui/ConfirmModal/ConfirmModal";
import { ContentLoading } from "src/components/common";
import { useTranslation } from "react-i18next";

interface ICurrentDayProps extends StateProps, DispatchProps {
  selectedYear: number;
  selectedMonth: string;
  selectedDay: number;
  isLoading: boolean;
  setIsLoading: (item: boolean) => void;
}

const CurrentDay: FC<ICurrentDayProps> = ({ auth, selectedYear, selectedMonth, selectedDay, isLoading, setIsLoading }) => {
  const { t } = useTranslation();
  /**
   * Using the useForm hook from react-hook-form to setting up the appointment form.
   */
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ITimeSlotFormData>({
    defaultValues: {
      startHour: "00",
      startMinutes: "00",
      endHour: "00",
      endMinutes: "00",
    },
  });

  /**
   * State of the appointment slots.
   * @state
   */
  const [appointmentSlots, setAppointmentSlots] = useState<IAppointmentSlot[] | null>(null);

  /**
   * Setting the state of the current appointment.
   * @state
   */
  const [currentAppointmentSlot, setCurrentAppointmentSlot] = useState<IAppointmentSlot | null>(null);

  /**
   * Setting the state of the appointment modal.
   * @state
   */
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);

  /**
   * Setting the state of the confirm delete modal.
   * @state
   */
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  /**
   * Setting the state of the active edit.
   * @state
   */
  const [isEditActive, setIsEditActive] = useState<boolean>(false);

  /**
   * Setting the state of the error message.
   * @state
   */
  const [customErrorMessage, setCustomErrorMessage] = useState<string | null>(null);

  /**
   * It serializeAppointments on mount.
   * @lifecycleHook
   */
  useEffect(() => {
    serializeAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, selectedYear, selectedMonth, selectedDay]);

  /**
   * Sets isEditActive to false if isAppointmentModalOpen is false.
   * @lifecycleHook
   */
  useEffect(() => {
    if (!isAppointmentModalOpen) {
      setIsEditActive(false);
    }
  }, [isAppointmentModalOpen]);

  /**
   * It gets the appointments from the database and sets the state of the appointments.
   */
  const serializeAppointments = async (): Promise<void> => {
    if (auth.account?.uid) {
      setIsLoading(true);
      const appointments = await getDocAppointments(auth.account?.uid);
      setIsLoading(false);
      if (appointments?.length) {
        const filtered = appointments.filter(
          (appointment) =>
            appointment.startDate.getFullYear() === selectedYear &&
            MONTHS.findIndex((m) => m === selectedMonth) + 1 === appointment.startDate.getMonth() &&
            appointment.startDate.getDate() === selectedDay
        );

        setAppointmentSlots(filtered);
      } else {
        setAppointmentSlots(null);
      }
    }
  };

  /**
   * It closes the modal.
   * @param {any} e - any - this is the event that is triggered when the user clicks the cancel button.
   */
  const handleCancelNewAppointment = (e: any) => {
    e.preventDefault();
    setIsAppointmentModalOpen(false);

    setValue("startHour", "00");
    setValue("startMinutes", "00");
    setValue("endHour", "00");
    setValue("endMinutes", "00");
  };

  /**
   * It takes in a form data object, converts the start and end times to Date objects, and then add the appointment to the database.
   * @param {ITimeSlotFormData} data - ITimeSlotFormData
   */
  const onAddNewAppointment = async (data: ITimeSlotFormData): Promise<void> => {
    const { startHour, startMinutes, endHour, endMinutes } = data;

    if (startHour <= endHour) {
      setCustomErrorMessage(null);

      const start = new Date(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay, +startHour, +startMinutes);

      const end = new Date(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay, +endHour, +endMinutes);

      if (auth.account?.uid) {
        setIsLoading(true);
        await addNewAppointment({
          userId: auth.account?.uid,
          startYear: selectedYear,
          startMonth: MONTHS.findIndex((m) => m === selectedMonth) + 1,
          startDay: selectedDay,
          startDate: start,
          endDate: end,
        });
        setIsLoading(false);
      }

      setIsAppointmentModalOpen(false);

      serializeAppointments();
    } else {
      setCustomErrorMessage(`End hour must be greater or equal to start hour.`);
    }
  };

  const onEditAppointment = async (data: ITimeSlotFormData): Promise<void> => {
    const { startHour, startMinutes, endHour, endMinutes } = data;

    if (startHour <= endHour) {
      setCustomErrorMessage(null);

      const start = new Date(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay, +startHour, +startMinutes);

      const end = new Date(selectedYear, MONTHS.findIndex((m) => m === selectedMonth) + 1, selectedDay, +endHour, +endMinutes);

      if (currentAppointmentSlot?.id) {
        setIsLoading(true);
        await editDocAppointment({
          id: currentAppointmentSlot.id,
          startYear: selectedYear,
          startMonth: MONTHS.findIndex((m) => m === selectedMonth) + 1,
          startDay: selectedDay,
          startDate: start,
          endDate: end,
        });
        setIsLoading(false);
      }

      setIsAppointmentModalOpen(false);
      setIsEditActive(false);
      serializeAppointments();
    } else {
      setCustomErrorMessage(`End hour must be greater or equal to start hour.`);
    }
  };

  const handleEditModalOpen = (item: IAppointmentSlot): void => {
    setIsEditActive(true);
    setCurrentAppointmentSlot(item);
    setIsAppointmentModalOpen(true);
    const startHourValue = item.startDate.getHours() < 10 ? `0${item.startDate.getHours()}` : `${item.startDate.getHours()}`;
    const startMinutesValue = item.startDate.getMinutes() < 10 ? `0${item.startDate.getMinutes()}` : `${item.startDate.getMinutes()}`;
    const endHourValue = item.endDate.getHours() < 10 ? `0${item.endDate.getHours()}` : `${item.endDate.getHours()}`;
    const endMinutesValue = item.endDate.getMinutes() < 10 ? `0${item.endDate.getMinutes()}` : `${item.endDate.getMinutes()}`;

    setValue("startHour", startHourValue);
    setValue("startMinutes", startMinutesValue);
    setValue("endHour", endHourValue);
    setValue("endMinutes", endMinutesValue);
  };

  /**
   * It takes an id as an argument, and if the currentAppointmentSlot is truthy, it calls the deleteDocAppointment function, which is imported from the firebase.
   * @param {string} id - The id of the appointment to be deleted.
   */
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
    setCurrentAppointmentSlot(appointment);
  };

  /**
   * If the user enters a single digit number, we add a zero to the beginning of the number.
   * @param {string} name - The name of the input field.
   * @param {string} value - The value of the input
   */
  const handleAppointmentChange = (name: string, value: string) => {
    if (value.length === 1) {
      switch (name) {
        case "startHour":
          setValue("startHour", `0${value}`);
          break;
        case "startMinutes":
          setValue("startMinutes", `0${value}`);
          break;
        case "endHour":
          setValue("endHour", `0${value}`);
          break;
        case "endMinutes":
          setValue("endMinutes", `0${value}`);
          break;
        default:
          break;
      }
    }
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

  return (
    <>
      <Suspense fallback={<ContentLoading />}>
        <div className={s.container}>
          <button onClick={() => setIsAppointmentModalOpen(true)}>
            <HiOutlinePlusSm className="h-5 w-5" />
            &nbsp;{t("current_day.add")}
          </button>

          <div className={s.timeSlotsContainer}>
            {HOURSFORMAT.map((time, i) => (
              <div key={i} className={s.timeSlot}>
                <span>{time}</span>
                {appointmentSlots
                  ?.filter((slot) => slot.startDate.getHours() === +time.split(":")[0])
                  ?.map((item, i) => (
                    <div
                      key={i}
                      className={`${s.appointment} ${+calculateItemHeight(item).substring(0, calculateItemHeight(item).length - 2) < 30 && "text-xs"
                        }`}
                      style={{
                        top: item.startDate.getMinutes() + "px",
                        height: calculateItemHeight(item),
                      }}
                    >
                      <div className={s.content}>
                        <HiOutlineClipboardList
                          className={`${+calculateItemHeight(item).substring(0, calculateItemHeight(item).length - 2) < 30 ? "hidden" : "block h-6 w-6"
                            }`}
                        />
                        <p>{t("current_day.empty")}</p>
                        <span>({renderTime(item)})</span>
                      </div>

                      <Menu as="div" className={s.menu}>
                        <div>
                          <Menu.Button className={s.menuButton}>
                            <HiOutlineDotsVertical className="text-4xl ml-2 -mr-1 h-5 w-5 text-slate-400" aria-hidden="true" />
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
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-slate-100 text-primary" : "text-primary"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => handleEditModalOpen(item)}
                                  >
                                    {active ? (
                                      <HiOutlinePencil className="mr-2 h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <HiOutlinePencil className="mr-2 h-5 w-5" aria-hidden="true" />
                                    )}
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active ? "bg-slate-100 text-primary" : "text-primary"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    onClick={() => openDeleteAppointmentModal(item)}
                                  >
                                    {active ? (
                                      <HiOutlineTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                                    ) : (
                                      <HiOutlineTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                                    )}
                                    Delete
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
                  <span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
      {isAppointmentModalOpen && (
        <div className="modal" onClick={() => setIsAppointmentModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(isEditActive ? onEditAppointment : onAddNewAppointment)}>
              <div className={s.formFields}>
                <input
                  className={`${errors.startHour ? "border-rose-500 focus:border-rose-500" : "border-slate-400 focus:border-blue"}`}
                  type="number"
                  min={0}
                  minLength={0}
                  maxLength={2}
                  {...register("startHour", {
                    required: true,
                    min: 0,
                    max: 23,
                    minLength: 0,
                    maxLength: 2,
                    onBlur: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.startHour ? "true" : "false"}
                />
                {errors.startHour?.type === "required" && <p>{errors.startHour?.message}</p>}

                <span>:</span>

                <input
                  className={`${errors.startMinutes ? "border-rose-500 focus:border-rose-500" : "border-slate-400 focus:border-blue"}`}
                  type="number"
                  min={0}
                  minLength={0}
                  maxLength={2}
                  {...register("startMinutes", {
                    required: true,
                    min: 0,
                    max: 59,
                    minLength: 0,
                    maxLength: 2,
                    onBlur: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.startMinutes ? "true" : "false"}
                />
                {errors.startMinutes?.type === "required" && <p>{errors.startMinutes?.message}</p>}
              </div>

              <div className={s.formFields}>
                <input
                  className={`${errors.endHour || customErrorMessage ? "border-rose-500 focus:border-rose-500" : "border-slate-400 focus:border-blue"
                    }`}
                  type="number"
                  min={0}
                  minLength={0}
                  maxLength={2}
                  {...register("endHour", {
                    required: true,
                    min: 0,
                    max: 23,
                    minLength: 0,
                    maxLength: 2,
                    onBlur: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.endHour ? "true" : "false"}
                />
                {errors.endHour?.type === "required" && <p>{errors.endHour?.message}</p>}

                <span>:</span>

                <input
                  className={`${errors.endMinutes ? "border-rose-500 focus:border-rose-500" : "border-slate-400 focus:border-blue"}`}
                  type="number"
                  min={0}
                  minLength={0}
                  maxLength={2}
                  {...register("endMinutes", {
                    required: true,
                    min: 0,
                    max: 59,
                    minLength: 0,
                    maxLength: 2,
                    onBlur: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.endMinutes ? "true" : "false"}
                />
                {errors.endMinutes?.type === "required" && <p>{errors.endMinutes?.message}</p>}
              </div>

              {customErrorMessage && <p className="self-center text-sm text-rose-500 whitespace-nowrap">{customErrorMessage}</p>}

              <div className={s.buttons}>
                <button onClick={(e) => handleCancelNewAppointment(e)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          text={"Are you sure you want to delete?"}
          item={currentAppointmentSlot?.id}
          submitButtonText={"Delete"}
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
