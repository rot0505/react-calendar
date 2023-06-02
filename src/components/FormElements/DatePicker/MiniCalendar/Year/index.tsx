import React from "react";

import { IModes } from "types/date";
import styles from './Year.module.scss';

interface YearProps {
  year: number;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  setMode: (mode: IModes) => void;
}

const Year: React.FC<YearProps> = ({
  year,
  selectedYear,
  setSelectedYear,
  setMode
}) => {
  const isCurrentYear = new Date().getFullYear() === year;
  const isSelectedYear = year === selectedYear;

  const handleSelectYear = () => {
    setSelectedYear(year);
    setMode('months');
  }

  return (
    <div
      key={year}
      aria-hidden
      onClick={handleSelectYear}
      className={`${styles.year} ${isCurrentYear && styles.year_today} ${isSelectedYear && styles.year_selected}`}
    >
      {year}
    </div>
  );
};

export default Year;