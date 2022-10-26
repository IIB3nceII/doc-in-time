import React, { FC, useEffect, useState } from "react";
import { CurrentDay, DatePicker } from "src/components/calendar";
import { MONTHS } from "src/utils/constants";
import s from "./Calendar.module.scss";

const Calendar: FC = () => {
  /**
   * Store the years.
   * @state
   */
  const [years, setYears] = useState<number[]>([]);

  /**
   * Setting the initial state of the selectedYear to the first item in the years array.
   * @state
   */
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  /**
   * Setting the initial state of the selectedMonth to the current month.
   * @state
   */
  const [selectedMonth, setSelectedMonth] = useState<string>(MONTHS[new Date().getMonth()]);

  /**
   * Setting the initial state of the selectedDay to the current day.
   * @state
   */
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  /**
   * Setting the initial state of the isLoading to false.
   * @state
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Calls generateYears
   * @lifecycleHook
   */
  useEffect(() => {
    generateYears();
  }, []);

  /**
   * It creates an array of years from the current year to 50 years ago, and sets the selected year to the current year.
   */
  const generateYears = () => {
    const max = new Date().getFullYear() + 10;
    const min = max - 50;
    let yrs = [];

    for (let i = max; i >= min; i--) {
      yrs.push(i);
    }

    setYears(yrs);
    setSelectedYear(yrs[10]);
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
