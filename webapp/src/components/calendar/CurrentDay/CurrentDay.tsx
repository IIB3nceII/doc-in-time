import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IRegisterFormData, ITimeSlotFormData } from "src/models";
import { HOURSFORMAT } from "src/utils/constants";
import s from "./CurrentDay.module.scss";
import { HiOutlinePlusSm } from "react-icons/hi";

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
  } = useForm<ITimeSlotFormData>();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(true);

  const handleCancelNewAppointment = (e: any) => {
    e.preventDefault();
    setIsAppointmentModalOpen(false);
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
            <form>
              <div className={s.formFields}>
                <input type="text" {...register("hour", { required: true })} aria-invalid={errors.hour ? "true" : "false"} />
                {errors.hour?.type === "required" && <p>{errors.hour?.message}</p>}

                <span>:</span>

                <input type="text" {...register("minutes", { required: true })} aria-invalid={errors.minutes ? "true" : "false"} />
                {errors.minutes?.type === "required" && <p>{errors.minutes?.message}</p>}

                <div className={s.radioGroup}>
                  <button>AM</button>
                  <button>PM</button>
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
