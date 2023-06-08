import React from "react";

import { IWeekDay } from "types/date";
import styles from "./Navigation.module.scss";

interface NavigationProps {
  weekDaysNames: IWeekDay[];
}

const Navigation: React.FC<NavigationProps> = ({ weekDaysNames }) => {
  return (
    <header className={styles.calendar_header}>
      {weekDaysNames.map((day, i) => {
        return (
          <div className={styles.calendar_day_label} key={i}>
            {day.dayShort}
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;
