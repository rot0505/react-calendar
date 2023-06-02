import React from "react";

import { IModes, IMonth, TMonth } from "types/date";
import styles from './Month.module.scss';

interface MonthProps {
  monthsName: IMonth;
  selectedYear: number;
  selectedMonth: TMonth;
  setSelectedMonthByIndex: (monthIndex: number) => void;
  setMode: (mode: IModes) => void;
}

const Month: React.FC<MonthProps> = ({
  monthsName,
  selectedYear,
  selectedMonth,
  setSelectedMonthByIndex,
  setMode
}) => {
  const d = new Date();
  const isCurrentMonth =
    d.getMonth() === monthsName.monthIndex &&
    selectedYear === d.getFullYear();

  const isSelectedMonth = monthsName.monthIndex === selectedMonth.monthIndex &&
    selectedYear === monthsName.date.getFullYear();

  const handleSelectMonth = () => {
    setSelectedMonthByIndex(monthsName.monthIndex);
    setMode('month');
  }

  return (
    <div
      key={monthsName.month}
      aria-hidden
      onClick={handleSelectMonth}
      className={`${styles.month} ${isSelectedMonth && styles.month_selected} ${isCurrentMonth && styles.month_today}`}
    >
      {monthsName.monthShort}
    </div>
  );
};

export default Month;