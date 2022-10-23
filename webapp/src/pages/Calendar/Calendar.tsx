import React, { useEffect, useMemo, useState } from "react";
import { CurrentDay, DatePicker } from "src/components/calendar";
import { MONTHS } from "src/utils/constants";
import s from "./Calendar.module.scss";

const Calendar = () => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  useEffect(() => {
    generateYears();
  }, []);

  const generateYears = (): void => {
    const max = new Date().getFullYear();
    const min = max - 50;
    let yrs = [];

    for (var i = max; i >= min; i--) {
      yrs.push(i);
    }

    setYears(yrs);
    setSelectedYear(yrs[0]);
  };

  return (
    <div>
      <DatePicker
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <CurrentDay selectedYear={selectedYear} selectedMonth={selectedMonth} selectedDay={selectedDay} />
    </div>
  );
};

export default Calendar;
