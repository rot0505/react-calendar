import React from "react";
import { IDirections, IModes, IMonth, TMonth } from "types/date";

import styles from './Header.module.scss';

interface HeaderProps {
  monthsNames: IMonth[];
  selectedYear: number;
  selectedMonth: TMonth;
  selectedYearsInterval: number[];
  mode: IModes;
  onClickArrow: (direction: IDirections) => void;
  setMode: (mode: IModes) => void;
}

const Header: React.FC<HeaderProps> = ({
  monthsNames,
  selectedYear,
  selectedMonth,
  selectedYearsInterval,
  mode,
  onClickArrow,
  setMode
}) => {
  const changeToPrev = () => onClickArrow('left');
  const changeToNext = () => onClickArrow('right');
  const changeModeToMonthes = () => setMode('months');
  const changeModeToYears = () => setMode('years');

  return (
    <div className={styles.header}>
      <div
        className={styles.header_arrow_icon}
        onClick={changeToPrev}
      >
        <i className="fas fa-chevron-left"></i>
      </div>

      {mode === 'month' && (
        <div onClick={changeModeToMonthes}>
          {monthsNames[selectedMonth.monthIndex].month} {selectedYear}
        </div>
      )}

      {mode === 'months' && (
        <div onClick={changeModeToYears}>
          {selectedYear}
        </div>
      )}

      {mode === 'years' && (
        <div>
          {selectedYearsInterval[0]} -{' '}
          {selectedYearsInterval[selectedYearsInterval.length - 1]}
        </div>
      )}

      <div
        className={styles.header_arrow_icon}
        onClick={changeToNext}
      >
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
}

export default Header;