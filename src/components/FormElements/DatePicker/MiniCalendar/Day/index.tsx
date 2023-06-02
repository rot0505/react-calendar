import React from "react";

import { IMonthDay, TMonth } from "types/date";
import { checkDateIsEqual, checkIsToday } from "utils/date";
import styles from './Day.module.scss';

interface DayProps {
  day: IMonthDay;
  selectedMonth: TMonth;
  selectDay: (date: Date) => void;
  selectedDate: Date;
}

const Day: React.FC<DayProps> = ({ day, selectedMonth, selectDay, selectedDate }) => {
  const isToday = checkIsToday(day.date);
  const isSelectedDay = checkDateIsEqual(day.date, selectedDate);
  const isAdditionalDay = day.monthIndex !== selectedMonth.monthIndex;

  const handleSelectDay = () => selectDay(day.date);

  return (
    <div
      key={`${day.dayNumber}-${day.monthIndex}`}
      aria-hidden
      onClick={handleSelectDay}
      className={`${styles.day} ${isToday && styles.day_today} ${isSelectedDay && styles.day_selected} ${isAdditionalDay && styles.day_additional}`}
    >
      {day.dayNumber}
    </div>
  );
}

export default Day;