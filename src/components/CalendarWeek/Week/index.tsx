import React from 'react';

import Day from '../Day';
import { IEvent } from 'types/event';
import { IMonthDay } from 'types/date';
import { shmoment } from 'utils/date';
import styles from './Week.module.scss';

interface IWeekProps {
  events: IEvent[];
  weekDays: IMonthDay[];
}

const Week: React.FC<IWeekProps> = ({ events, weekDays }) => {
  return (
    <div className={styles.calendar_week}>
      {weekDays.map((day) => {
        const nextDay = shmoment(day.date).add('days', 1).result();

        // getting all events from the current day we will render
        const dayEvents = events?.filter((event) => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);

          return eventStartDate.getTime() > day.date.getTime() &&
            eventEndDate.getTime() < nextDay.getTime()
        });

        const prevDayEvents = events.filter((event) => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);

          return day.date.getTime() <= eventEndDate.getTime() &&
            day.date.getTime() > eventStartDate.getTime();
        });

        const nextDayEvents = events.filter((event) => {
          const eventStartDate = new Date(event.start);
          const eventEndDate = new Date(event.end);

          return nextDay.getTime() > eventStartDate.getTime() &&
            nextDay.getTime() <= eventEndDate.getTime();
        });

        return (
          <Day
            key={day.dayNumber}
            dayEvents={dayEvents}
            prevDayEvents={prevDayEvents}
            nextDayEvents={nextDayEvents}
            dayData={day}
          />
        );
      })}
    </div>
  );
};

export default Week;
