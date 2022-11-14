import React, { FC, useState } from "react";
import { CurrentDay, DatePicker } from "src/components/calendar";
import { useCalendar } from "src/shared/hooks";
import s from "./Calendar.module.scss";
import { IRootState } from "src/shared/store";
import { connect } from "react-redux";

interface ICalendarProps extends StateProps, DispatchProps {}

const Calendar: FC<ICalendarProps> = ({ auth: { account } }) => {
  const { years, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay } = useCalendar();

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
          doc={account!}
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

const mapStateToProps = ({ auth }: IRootState) => ({
  auth,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
