import React, { FC, useEffect } from "react";
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
  return (
    <div className={s.container}>
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
  );
};

export default CurrentDay;
