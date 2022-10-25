import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IAppointmentSlot, IRegisterFormData, ITimeSlotFormData } from "src/models";
import { HOURSFORMAT, MONTHS } from "src/utils/constants";
import s from "./CurrentDay.module.scss";
import { HiOutlinePlusSm } from "react-icons/hi";
import { addNewAppointment } from "src/utils/firebase/firestore";
import getDocAppointments from "src/utils/firebase/firestore/get-doc-appointments";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";

const dummyAppointment = {
  hour: 8,
  minutes: 13,
  endHour: 9,
  endMinutes: 25,
};

interface ICurrentDayProps extends StateProps, DispatchProps {
  selectedYear: number;
  selectedMonth: string;
  selectedDay: number;
}

const CurrentDay: FC<ICurrentDayProps> = ({ auth, selectedYear, selectedMonth, selectedDay }) => {
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
  const [appointmentSlots, setAppointmentSlots] = useState<IAppointmentSlot[] | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);

  useEffect(() => {
    serializeAppointments();
  }, [auth]);

  useEffect(() => {
    console.log(appointmentSlots);
  }, [appointmentSlots]);

  const serializeAppointments = async (): Promise<void> => {
    if (auth.account?.uid) {
      const appointments = await getDocAppointments(auth.account?.uid);

      if (appointments?.length) {
        setAppointmentSlots(appointments);
      }
    }
  };

  const handleCancelNewAppointment = (e: any) => {
    e.preventDefault();
    setIsAppointmentModalOpen(false);
  };

  const onAddNewAppointment = async (data: ITimeSlotFormData): Promise<void> => {
    const { startHour, startMinutes, endHour, endMinutes } = data;

    const start = new Date(
      selectedYear,
      MONTHS.findIndex((m) => m === selectedMonth),
      selectedDay,
      +startHour,
      +startMinutes
    );

    const end = new Date(
      selectedYear,
      MONTHS.findIndex((m) => m === selectedMonth),
      selectedDay,
      +endHour,
      +endMinutes
    );

    if (auth.account?.uid) {
      await addNewAppointment({ userId: auth.account?.uid, startDate: start, endDate: end });
    }

    setIsAppointmentModalOpen(false);

    serializeAppointments();
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

  return (
    <>
      <div className={s.container}>
        <button onClick={() => setIsAppointmentModalOpen(true)}>
          <HiOutlinePlusSm className="h-5 w-5" />
          &nbsp;Add
        </button>

        <div className={s.timeSlotsContainer}>
          {HOURSFORMAT.map((time, i) => (
            <div key={i} className={s.timeSlot}>
              <span>{time}</span>
              {+time.split(":")[0] === dummyAppointment.hour && (
                <div
                  className={s.appointment}
                  style={{
                    top: dummyAppointment.minutes + "px",
                    height:
                      dummyAppointment.endHour > dummyAppointment.hour
                        ? dummyAppointment.endMinutes - dummyAppointment.minutes + (dummyAppointment.endHour - dummyAppointment.hour) * 60 + "px"
                        : dummyAppointment.endMinutes - dummyAppointment.minutes + "px",
                  }}
                >
                  Erzsi neni nemvalto mutetje
                </div>
              )}
              <div className={s.timeSlotsDividers}>
                <span></span>
                <span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isAppointmentModalOpen && (
        <div className="modal" onClick={() => setIsAppointmentModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onAddNewAppointment)}>
              <div className={s.formFields}>
                <input
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
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.startHour ? "true" : "false"}
                />
                {errors.startHour?.type === "required" && <p>{errors.startHour?.message}</p>}

                <span>:</span>

                <input
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
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.startMinutes ? "true" : "false"}
                />
                {errors.startMinutes?.type === "required" && <p>{errors.startMinutes?.message}</p>}
              </div>

              <div className={s.formFields}>
                <input
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
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.endHour ? "true" : "false"}
                />
                {errors.endHour?.type === "required" && <p>{errors.endHour?.message}</p>}

                <span>:</span>

                <input
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
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.endMinutes ? "true" : "false"}
                />
                {errors.endMinutes?.type === "required" && <p>{errors.endMinutes?.message}</p>}
              </div>

              <div className={s.buttons}>
                <button onClick={(e) => handleCancelNewAppointment(e)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
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
