import React from "react";

import { IDirections, IModes, IMonth, IMonthDay, IWeekDay, TMonth } from "types/date";
import Header from "./Header";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";
import styles from "./MiniCalendar.module.scss";

interface MiniCalendarProps {
  monthsNames: IMonth[];
  selectedYear: number;
  selectedMonth: TMonth;
  weekDaysNames: IWeekDay[];
  calendarDaysOfMonth: IMonthDay[];
  selectedDate: Date;
  selectedYearsInterval: number[];
  mode: IModes;
  onClickArrow: (direction: IDirections) => void;
  selectDay: (date: Date) => void;
  setMode: (mode: IModes) => void;
  setSelectedMonthByIndex: (monthIndex: number) => void;
  setSelectedYear: (year: number) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  monthsNames,
  selectedYear,
  selectedMonth,
  weekDaysNames,
  calendarDaysOfMonth,
  selectedDate,
  selectedYearsInterval,
  mode,
  onClickArrow,
  selectDay,
  setMode,
  setSelectedMonthByIndex,
  setSelectedYear,
}) => {
  return (
    <div className={styles.mini_calendar}>
      <Header
        onClickArrow={onClickArrow}
        monthsNames={monthsNames}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        selectedYearsInterval={selectedYearsInterval}
        mode={mode}
        setMode={setMode}
      />
      <div className={styles.mini_calendar_body}>
        {mode === "month" && (
          <Days
            selectDay={selectDay}
            selectedMonth={selectedMonth}
            weekDaysNames={weekDaysNames}
            calendarDaysOfMonth={calendarDaysOfMonth}
            selectedDate={selectedDate}
          />
        )}
        {mode === "months" && (
          <Months
            selectedMonth={selectedMonth}
            monthsNames={monthsNames}
            selectedYear={selectedYear}
            setSelectedMonthByIndex={setSelectedMonthByIndex}
            setMode={setMode}
          />
        )}
        {mode === "years" && (
          <Years
            selectedYearsInterval={selectedYearsInterval}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            setMode={setMode}
            onClickArrow={onClickArrow}
          />
        )}
      </div>
    </div>
  );
};

export default MiniCalendar;
