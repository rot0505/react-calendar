import React from "react";

import { useTypedSelector } from "hooks/index";
import { IMonthDay, IWeekDay } from "types/date";
import { getEventsInterval, getLongEvents, getShortEvents } from "utils/helpers";
import Navigation from "./Navigation";
import Week from "./Week";
import Sidebar from "./Sidebar";
import LongEvents from "./LongEvents";
import styles from "./CalendarWeek.module.scss";

interface IWeekCalendarProps {
  weekDays: IMonthDay[];
  weekDaysNames: IWeekDay[];
}

const CalendarWeek: React.FC<IWeekCalendarProps> = ({ weekDays, weekDaysNames }) => {
  const { events } = useTypedSelector(({ events }) => events);
  const weekEvents = getEventsInterval(weekDays, events);
  const shortEvents = getShortEvents(weekEvents);
  const longEvents = getLongEvents(weekEvents);

  return (
    <>
      <div className={styles.calendar_week_header_container}>
        <Navigation weekDays={weekDays} weekDaysNames={weekDaysNames} />
        <LongEvents weekDays={weekDays} events={longEvents} />
      </div>
      <div className="calendar_body">
        <div className={styles.calendar_week_container}>
          <Sidebar />
          <Week events={shortEvents} weekDays={weekDays} />
        </div>
      </div>
    </>
  );
};

export default CalendarWeek;
