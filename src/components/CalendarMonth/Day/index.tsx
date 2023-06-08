import React, { MouseEvent } from "react";

import { IMonthDay, TMonth } from "types/date";
import { IEvent } from "types/event";
import { checkIsToday, createDate, getNextStartMinutes, shmoment } from "utils/date";
import { useModal } from "hooks/useModal";
import { getStyledForLongEvent } from "utils/helpers";
import LongEvent from "components/LongEvent";
import ShortEvent from "components/ShortEvent";
import styles from "./Day.module.scss";

interface IDayProps {
  weekDays: IMonthDay[];
  day: IMonthDay;
  selectedMonth: TMonth;
  dayShortEvents: IEvent[];
  dayLongEvents: IEvent[];
  dayEventsPositionY: string[];
  countRows: number;
}

const Day: React.FC<IDayProps> = ({
  weekDays,
  day,
  selectedMonth,
  dayShortEvents,
  dayLongEvents,
  dayEventsPositionY,
  countRows,
}) => {
  const { openModalCreate, openModalDayInfo } = useModal();

  const maxCountEventsInDay = countRows === 6 ? 3 : 4;

  const countShortEvents = maxCountEventsInDay - dayEventsPositionY.length;

  const isShowMoreBtn = maxCountEventsInDay < dayEventsPositionY.length + dayShortEvents.length;

  const maxCountLongEvents = isShowMoreBtn ? maxCountEventsInDay - 1 : maxCountEventsInDay;

  const countLongEvents = dayEventsPositionY.slice(0, maxCountLongEvents).reduce((total) => total + 1, 0);

  const restCountEvents = dayShortEvents.length + dayLongEvents.length - countLongEvents;

  const styleForMoreBtn = { top: (maxCountEventsInDay - 1) * 24 };

  const handleCreateEvent = () => {
    const { hours, minutes } = createDate({ date: new Date() });
    const startMins = getNextStartMinutes(minutes);
    const selectedDate = shmoment(day.date)
      .add("hours", hours)
      .add("minutes", minutes + startMins)
      .result();

    openModalCreate({ selectedDate, type: "long-event" });
  };

  const handleShowModalDayInfo = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModalDayInfo(day.date);
  };

  return (
    <div className={styles.day} onClick={handleCreateEvent}>
      <div
        className={`${styles.day_label} ${checkIsToday(day.date) && styles.day_label_active} ${
          day.monthIndex !== selectedMonth.monthIndex && styles.day_label_additional
        }`}
      >
        {day.dayNumber === 1 ? `${day.dayNumber} ${day.monthShort}` : day.dayNumber}
      </div>
      <div className={styles.day_events}>
        {dayEventsPositionY.slice(0, maxCountLongEvents).map((eventId, indx) => {
          const event = dayLongEvents.find((event) => event.id === eventId);

          const { width, isShowEvent, isMovingFromPrev, isMovingToNext } = getStyledForLongEvent(weekDays, day, event!);

          const top = indx * 24;

          return (
            <LongEvent
              key={event!.id}
              event={event!}
              width={width}
              top={top}
              color={event!.color}
              isShowEvent={isShowEvent}
              isMovingToNext={isMovingToNext}
              isMovingFromPrev={isMovingFromPrev}
            />
          );
        })}
        {!isShowMoreBtn &&
          dayShortEvents.slice(0, countShortEvents).map((event, indx) => {
            const top = (dayEventsPositionY.length + indx) * 24;
            return <ShortEvent key={event.id} event={event} top={top} />;
          })}
        {isShowMoreBtn && (
          <button className={styles.day_more_btn} style={styleForMoreBtn} onClick={handleShowModalDayInfo}>
            {restCountEvents} More
          </button>
        )}
      </div>
    </div>
  );
};

export default Day;
