import React from "react";
import Day from "../Day";
import { IMonthDay, IWeekDay, TMonth } from "types/date";

import styles from './Days.module.scss';

interface DaysProps {
  selectDay: (date: Date) => void;
  selectedMonth: TMonth;
  weekDaysNames: IWeekDay[];
  calendarDaysOfMonth: IMonthDay[];
  selectedDate: Date;
}

const Days: React.FC<DaysProps> = ({
  selectDay,
  selectedMonth,
  weekDaysNames,
  calendarDaysOfMonth,
  selectedDate
}) => {
  return (
    <>
      <div className={styles.week_names}>
        {weekDaysNames.map((weekDaysName) => (
          <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
        ))}
      </div>
      <div className={styles.days}>
        {calendarDaysOfMonth.map((day) => (
          <Day
            key={`${day.year}-${day.monthIndex}-${day.dayNumber}`}
            day={day}
            selectedMonth={selectedMonth}
            selectDay={selectDay}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </>
  );
};

export default Days;