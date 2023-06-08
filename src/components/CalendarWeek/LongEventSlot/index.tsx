import React from "react";

import { IEvent } from "types/event";
import { IMonthDay } from "types/date";
import LongEvent from "components/LongEvent";
import { useModal } from "hooks/useModal";
import { getStyledForLongEvent } from "utils/helpers";
import styles from "./LongEventSlot.module.scss";

interface ILongEventSlotProps {
  isEventsEmpty: boolean;
  dayEvents: IEvent[];
  weekDays: IMonthDay[];
  day: IMonthDay;
  dayEventsPositionY: string[];
  slotHeight?: number;
}

const LongEventSlot: React.FC<ILongEventSlotProps> = ({
  isEventsEmpty,
  dayEvents,
  weekDays,
  day,
  dayEventsPositionY,
  slotHeight,
}) => {
  const { openModalCreate } = useModal();

  const handleOpenmodalCreateEvent = () => {
    openModalCreate({ selectedDate: day.date, type: "long-event" });
  };

  const slotStyle = { height: `${slotHeight}px` };

  return (
    <div
      className={`${styles.event_slot} ${isEventsEmpty && styles.event_slot_empty}`}
      style={slotStyle}
      onClick={handleOpenmodalCreateEvent}
    >
      {dayEvents.map((event) => {
        const { width, isShowEvent, isMovingFromPrev, isMovingToNext } = getStyledForLongEvent(weekDays, day, event);

        const top = dayEventsPositionY.indexOf(event.id) * 24;

        return (
          <LongEvent
            key={event.id}
            event={event}
            width={width}
            top={top}
            color={event.color}
            isShowEvent={isShowEvent}
            isMovingToNext={isMovingToNext}
            isMovingFromPrev={isMovingFromPrev}
          />
        );
      })}
    </div>
  );
};

export default LongEventSlot;
