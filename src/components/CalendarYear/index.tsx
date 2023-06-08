import React from "react";

import { IMonth, IMonthDay, IWeekDay, TDate, TMonth } from "types/date";
import Month from "./Month";
import styles from "./CalendarYear.module.scss";

interface CalendarPropsYear {
  calendarDaysOfYear: IMonthDay[][];
  selectedMonth: TMonth;
  monthsNames: IMonth[];
  weekDaysNames: IWeekDay[];
  selectedDay: TDate;
  onChangeState: (date: Date) => void;
}

const CalendarYear: React.FC<CalendarPropsYear> = ({
  calendarDaysOfYear,
  selectedMonth,
  monthsNames,
  weekDaysNames,
  selectedDay,
  onChangeState,
}) => {
  return (
    <div className="calendar_body">
      <div className={styles.calendar_year_container}>
        {calendarDaysOfYear.map((calendarDaysOfMonth, i) => (
          <Month
            key={`${selectedMonth.year}-${i}`}
            calendarDaysOfMonth={calendarDaysOfMonth}
            month={monthsNames[i]}
            monthIndex={i}
            weekDaysNames={weekDaysNames}
            selectedDay={selectedDay}
            onChangeState={onChangeState}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarYear;
