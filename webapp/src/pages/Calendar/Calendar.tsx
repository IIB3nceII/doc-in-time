import React, { useEffect, useState } from "react";
import { CurrentDay, DatePicker } from "src/components/calendar";
import { MONTHS } from "src/utils/constants";
import s from "./Calendar.module.scss";

const Calendar = () => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    generateYears();
  }, []);

  const generateYears = () => {
    const max = new Date().getFullYear();
    const min = max - 50;
    let yrs = [];

    for (let i = max; i >= min; i--) {
      yrs.push(i);
    }

    setYears(yrs);
    setSelectedYear(yrs[0]);
  };

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
