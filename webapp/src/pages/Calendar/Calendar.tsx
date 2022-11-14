import React, { FC, useState } from "react";
import { CurrentDay, DatePicker } from "src/components/calendar";
import { useCalendar } from "src/shared/hooks";
import s from "./Calendar.module.scss";

const Calendar: FC = () => {
  const { years, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay } =
    useCalendar();

  /**
   * Setting the initial state of the isLoading to false.
   * @state
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className={s.container}>
      <div className={`${s.picker} dark:bg-slate-900`}>
        <DatePicker
          isLoading={isLoading}
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      </div>
      <CurrentDay
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default Calendar;
