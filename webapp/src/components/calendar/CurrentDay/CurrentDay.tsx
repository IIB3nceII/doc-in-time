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
  } = useForm<ITimeSlotFormData>({
    defaultValues: {
      hour: "00",
      minutes: "00",
    },
  });
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(true);

  const handleCancelNewAppointment = (e: any) => {
    e.preventDefault();
    setIsAppointmentModalOpen(false);
  };

  const onAddNewAppointment = (data: ITimeSlotFormData) => {
    console.log(data);
  };

  const handleAppointmentChange = (name: string, value: string) => {
    if (name === "hour" && value.length === 1) {
      setValue("hour", `0${value}`);
    } else if (name === "minutes" && value.length === 1) {
      setValue("minutes", `0${value}`);
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
                  {...register("hour", {
                    required: true,
                    min: 0,
                    max: 23,
                    minLength: 0,
                    maxLength: 2,
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.hour ? "true" : "false"}
                />
                {errors.hour?.type === "required" && <p>{errors.hour?.message}</p>}

                <span>:</span>

                <input
                  type="number"
                  min={0}
                  minLength={0}
                  maxLength={2}
                  {...register("minutes", {
                    required: true,
                    min: 0,
                    max: 59,
                    minLength: 0,
                    maxLength: 2,
                    onChange: (e) => handleAppointmentChange(e.target.name, e.target.value),
                  })}
                  aria-invalid={errors.minutes ? "true" : "false"}
                />
                {errors.minutes?.type === "required" && <p>{errors.minutes?.message}</p>}
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
