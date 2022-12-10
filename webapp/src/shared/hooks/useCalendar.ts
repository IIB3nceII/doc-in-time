import { useMemo, useState } from "react";
import { MONTHS } from "src/utils/constants";

const useCalendar = () => {
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
   * Generate years.
   * @lifecycleHook
   */
  useMemo(() => {
    const max = new Date().getFullYear() + 10;
    const min = max - 50;
    let yrs = [];

    for (let i = max; i >= min; i--) {
      yrs.push(i);
    }

    setYears(yrs);
    setSelectedYear(yrs[10]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { years, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay };
};

export default useCalendar;
