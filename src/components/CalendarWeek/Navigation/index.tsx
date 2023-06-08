import React from "react";

import { checkIsToday, checkIsPast } from "utils/date";
import { IMonthDay, IWeekDay } from "types/date";
import { useModal } from "hooks/useModal";
import styles from "./Navigation.module.scss";

interface INavigationProps {
  weekDays: IMonthDay[];
  weekDaysNames: IWeekDay[];
}

const Navigation: React.FC<INavigationProps> = ({ weekDays, weekDaysNames }) => {
  const { openModalCreate } = useModal();
  return (
    <header className={styles.week_header}>
      {weekDays.map((dayDate, i) => {
        const { dayNumber, year, monthIndex, date } = dayDate;
        const uniqKey = `${year}-${monthIndex}-${dayNumber}`;

        const isPastDay = checkIsPast(date);
        const isTodayDay = checkIsToday(date);

        return (
          <div
            className={styles.day_label}
            key={uniqKey}
            onClick={() => openModalCreate({ selectedDate: dayDate.date, type: "long-event" })}
          >
            <span className={`${styles.day_label_name} ${isTodayDay && styles.day_label_name_today}`}>
              {weekDaysNames[i].dayShort}
            </span>
            <span
              className={`${styles.day_label_number} ${isTodayDay && styles.day_label_number_today} ${
                isPastDay && styles.day_label_number_past
              }`}
            >
              {dayNumber}
            </span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
