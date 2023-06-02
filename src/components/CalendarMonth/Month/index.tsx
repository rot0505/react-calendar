import React from 'react';

import { IMonthDay, TMonth } from 'types/date';
import { IEvent } from 'types/event';
import Week from '../Week';
import styles from './Month.module.scss';

interface IMonthProps {
  calendarDaysOfMonth: IMonthDay[];
  selectedMonth: TMonth;
  shortEvents: IEvent[];
  longEvents: IEvent[];
}

const Month: React.FC<IMonthProps> = ({
  calendarDaysOfMonth,
  selectedMonth,
  shortEvents,
  longEvents
}) => {
  const countRows = (calendarDaysOfMonth.length / 7);

  const weeksDays = Array.from({ length: countRows })
    .map((_, i) => calendarDaysOfMonth.slice(i * 7, (i + 1) * 7))

  return (
    <div className={styles.calendar_month}>
      {weeksDays.map((weekDays, i) => {
        return (
          <Week
            key={i}
            weekDays={weekDays}
            selectedMonth={selectedMonth}
            shortEvents={shortEvents}
            longEvents={longEvents}
            countRows={countRows}
          />
        );
      })}
    </div>
  );
}

export default Month;
