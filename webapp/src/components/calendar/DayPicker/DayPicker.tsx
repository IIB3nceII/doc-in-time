import React, { FC, useEffect, useState } from "react";
import { DAYS, MONTHS } from "src/utils/constants";
import s from "./DayPicker.module.scss";

interface IDayPickerProps {
  year: number;
  month: string;
  day: number;
  setDay: (day: number) => void;
}

const DayPicker: FC<IDayPickerProps> = ({ year, month, day, setDay }) => {
  const [numberOfDays, setNumberOfDays] = useState<number>(0);

  useEffect(() => {
    getDaysInCurrentMonth();

    buildMonthView();
  }, [month]);

  const getDaysInCurrentMonth = (): void => {
    const num = new Date(year, MONTHS.indexOf(month) + 1, 0).getDate();

    if (num) {
      setNumberOfDays(num);
    }
  };

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
            <th key={i} className={s.columnHeader}>
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {buildMonthView().map((item, i) => (
          <tr key={i}>
            {item.map((value, j) => (
              <td key={j} onClick={() => setDay(value)}>
                <span
                  className={`${
                    +new Date().getDate() === value ? "text-white font-semibold bg-blue" : day === value ? "font-semibold bg-sky-200" : ""
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
