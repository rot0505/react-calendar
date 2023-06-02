import React from "react";

import { IMonthDay, TMonth } from "types/date";
import { IEvent } from "types/event";
import { checkDateIsEqual } from "utils/date";
import { getPositionYForWeekEvents, getSortedEvents, getSortedWeekEvents } from "utils/helpers";
import Day from "../Day";
import styles from './Week.module.scss';

interface IWeekProps {
  weekDays: IMonthDay[];
  shortEvents: IEvent[];
  longEvents: IEvent[];
  selectedMonth: TMonth;
  countRows: number;
}

const Week: React.FC<IWeekProps> = ({
  weekDays,
  shortEvents,
  longEvents,
  selectedMonth,
  countRows
}) => {
  const { sortedWeekEvents } = getSortedWeekEvents(weekDays, longEvents);

  const weekEventsPositionY = getPositionYForWeekEvents(sortedWeekEvents);
  return (
    <div className={styles.calendar_week}>
      {weekDays.map((day, indx) => {
        const startDateOfDay = day.date;

        const dayShortEvents = shortEvents.filter((event) => {
          const startDateEvent = new Date(event.start);
          return checkDateIsEqual(startDateEvent, startDateOfDay);
        });

        const sortedDayShortEvents = getSortedEvents(dayShortEvents);

        return (
          <Day
            key={`${day.monthIndex}-${day.dayNumber}`}
            day={day}
            selectedMonth={selectedMonth}
            dayShortEvents={sortedDayShortEvents}
            dayLongEvents={sortedWeekEvents[indx]}
            dayEventsPositionY={weekEventsPositionY[indx]}
            countRows={countRows}
            weekDays={weekDays}
          />
        );
      })}
    </div>
  );
}

export default Week;