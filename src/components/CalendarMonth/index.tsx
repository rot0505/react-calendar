import React, { WheelEvent } from "react";

import { useTypedSelector } from "hooks/index";
import { useThrottle } from "hooks/useThrottle";
import { IDirections, IMonthDay, IWeekDay, TMonth } from "types/date";
import { getEventsInterval, getLongEvents, getShortEvents } from "utils/helpers";
import Month from "./Month";
import Navigation from "./Navigation";
import styles from "./CalendarMonth.module.scss";

interface CalendarPropsIMont {
  weekDaysNames: IWeekDay[];
  calendarDaysOfMonth: IMonthDay[];
  selectedMonth: TMonth;
  onClickArrow: (direction: IDirections) => void;
}

const CalendarMonth: React.FC<CalendarPropsIMont> = ({
  weekDaysNames,
  calendarDaysOfMonth,
  selectedMonth,
  onClickArrow,
}) => {
  const { events } = useTypedSelector(({ events }) => events);

  const monthEvents = getEventsInterval(calendarDaysOfMonth, events);
  const shortEvents = getShortEvents(monthEvents);
  const longEvents = getLongEvents(monthEvents);

  const changeMonth = useThrottle((e: WheelEvent<HTMLElement>) => {
    const { deltaY } = e;
    const direction = deltaY > 0 ? "right" : "left";
    onClickArrow(direction);
  }, 300);

  return (
    <div className={styles.calendar_container} onWheel={changeMonth}>
      <Navigation weekDaysNames={weekDaysNames} />
      <div className="calendar_body">
        <div className={styles.calendar_content}>
          <Month
            calendarDaysOfMonth={calendarDaysOfMonth}
            selectedMonth={selectedMonth}
            shortEvents={shortEvents}
            longEvents={longEvents}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
