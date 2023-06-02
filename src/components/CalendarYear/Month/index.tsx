import React from 'react';

import { IMonth, IMonthDay, IWeekDay, TDate } from 'types/date';
import Day from '../Day';
import styles from './Month.module.scss';

interface IMonthProps {
  calendarDaysOfMonth: IMonthDay[];
  month: IMonth;
  weekDaysNames: IWeekDay[];
  monthIndex: number;
  selectedDay: TDate;
  onChangeState: (date: Date) => void;
}

const Month: React.FC<IMonthProps> = ({
  calendarDaysOfMonth,
  month,
  weekDaysNames,
  monthIndex,
  selectedDay,
  onChangeState
}) => {
  return (
    <div className={styles.month}>
      <div className={styles.month_title}>
        <span className={styles.month_title_name}>
          {month.month}
        </span>
      </div>
      <div className={styles.month_header}>
        {weekDaysNames.map(weekDay => (
          <div
            key={weekDay.day}
            className={styles.month_header_day}
          >{weekDay.dayShort}</div>
        ))}
      </div>
      <div className={styles.month_body}>
        {calendarDaysOfMonth.map((day) => (
          <Day
            key={`${day.monthIndex}-${day.dayNumber}`}
            day={day}
            monthIndex={monthIndex}
            selectedDay={selectedDay}
            onChangeState={onChangeState}
          />
        ))}
      </div>
    </div>
  );
}

export default Month;
