import React, { FC, useEffect, useState } from "react";
import { DAYS, MONTHS } from "src/utils/constants";
import s from "./DayPicker.module.scss";

interface IDayPickerProps {
  year: number;
  month: string;
  day: number;
  setDay: (day: number) => void;
  isLoading?: boolean;
}

const DayPicker: FC<IDayPickerProps> = ({ year, month, day, setDay, isLoading }) => {
  /**
   * State of the days number.
   * @state
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  /**
   * It calls currentMonth and buildMonthView.
   * @lifecycleHook
   */
  useEffect(() => {
    getDaysInCurrentMonth();

    buildMonthView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  /**
   * It gets the number of days in the current month and sets the state of numberOfDays to that number.
   */
  const getDaysInCurrentMonth = () => {
    const num = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate();

    if (num) {
      setNumberOfDays(num);
    }
  };

  /**
   * It builds a calendar view for a given month.
   * @returns An array of arrays.
   */
  const buildMonthView = () => {
    let dy = 1;
    let idx = 0;
    const firstDay = new Date(year, MONTHS.indexOf(month), 0).getDay();
    const lastDay = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate();
    let arr = [];
    for (let i = 0; i < 41; i++) {
      if (i % 7 === 0) {
        arr.push([]);

        if (i >= 7) {
          idx++;
        }
      }

      if (i >= firstDay && dy <= lastDay) {
        arr[idx].push(dy as any as never);
        dy++;
      } else {
        arr[idx].push(" " as any as never);
      }
    }

    return arr;
  };

  return (
    <table className={s.container}>
      <thead>
        <tr className={s.columnHeaderContainer}>
          {DAYS.map((day, i) => (
            <th key={i} className={`${s.columnHeader} text-primary dark:text-white`}>
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {buildMonthView().map((item, i) => (
          <tr key={i}>
            {item.map((value, j) => (
              <td key={j} onClick={() => !isLoading && value !== " " && setDay(value)}>
                <span
                  className={`${day === value ? "text-white font-semibold bg-blue" : +new Date().getDate() === value ? "font-semibold bg-sky-200" : ""
                    } rounded-full m-2 p-1`}
                >
                  {value}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DayPicker;
