import React from "react";
import { IModes, IMonth, TMonth } from "types/date";
import Month from "../Month";

import styles from './Months.module.scss';

interface MonthsProps {
  monthsNames: IMonth[];
  selectedYear: number;
  selectedMonth: TMonth;
  setSelectedMonthByIndex: (monthIndex: number) => void;
  setMode: (mode: IModes) => void;
}

const Months: React.FC<MonthsProps> = ({
  monthsNames,
  selectedYear,
  selectedMonth,
  setSelectedMonthByIndex,
  setMode
}) => {
  return (
    <div className={styles.months_container}>
      {monthsNames.map((monthsName) => (
        <Month
          key={monthsName.month}
          monthsName={monthsName}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonthByIndex={setSelectedMonthByIndex}
          setMode={setMode}
        />
      ))}
    </div>
  );
};

export default Months;