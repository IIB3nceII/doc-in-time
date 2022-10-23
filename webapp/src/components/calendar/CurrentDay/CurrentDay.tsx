import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IRegisterFormData } from "src/models";
import { HOURSFORMAT } from "src/utils/constants";
import s from "./CurrentDay.module.scss";

const dummyAppointment = {
  hour: 8,
  minutes: 13,
  endHour: 9,
  endMinutes: 25,
};

interface ICurrentDayProps {
  selectedYear: number;
  selectedMonth: string;
  selectedDay: number;
}

const CurrentDay: FC<ICurrentDayProps> = ({ selectedYear, selectedMonth, selectedDay }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);

  const handleCancelNewAppointment = (e: any) => {
    e.preventDefault();
    setIsAppointmentModalOpen(false);
  };

  return (
    <>
      <div className={s.container}>
        <button onClick={() => setIsAppointmentModalOpen(true)}>Add New Appointment</button>

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
        <div className={s.appointmentModal} onClick={() => setIsAppointmentModalOpen(false)}>
          <div className={s.modalContainer} onClick={(e) => e.stopPropagation()}>
            <form>
              <div className={s.formFields}>
                <div className={s.formField}>
                  <label>First Name</label>
                  <input type="text" {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
                  {errors.firstName?.type === "required" && <p>{errors.firstName?.message}</p>}
                </div>

                <div className={s.formField}>
                  <label>First Name</label>
                  <input type="text" {...register("firstName", { required: true })} aria-invalid={errors.firstName ? "true" : "false"} />
                  {errors.firstName?.type === "required" && <p>{errors.firstName?.message}</p>}
                </div>
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

export default CurrentDay;
