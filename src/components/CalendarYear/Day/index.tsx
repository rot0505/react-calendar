import React, { MouseEvent } from "react";

import { IMonthDay, TDate } from "types/date";
import { checkDateIsEqual, checkIsToday } from "utils/date";
import { useModal } from "hooks/useModal";
import styles from "./Day.module.scss";

interface IDayProps {
  day: IMonthDay;
  monthIndex: number;
  selectedDay: TDate;
  onChangeState: (date: Date) => void;
}

const Day: React.FC<IDayProps> = ({ day, monthIndex, selectedDay, onChangeState }) => {
  const { openModalDayInfo } = useModal();
  const handleSelectDay = () => onChangeState(day.date);
  const isAdditionalDay = day.monthIndex !== monthIndex;

  const handleOpenModalDayInfo = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    openModalDayInfo(day.date);
  };

  return (
    <div className={styles.day} onClick={handleOpenModalDayInfo}>
      <div
        className={`${styles.day_label} ${checkIsToday(day.date) && styles.day_label_active} ${
          isAdditionalDay && styles.day_label_additional
        } ${!isAdditionalDay && checkDateIsEqual(day.date, selectedDay.date) && styles.day_label_selected}`}
        onClick={handleSelectDay}
      >
        {day.dayNumber}
      </div>
    </div>
  );
};

export default Day;
