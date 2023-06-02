import React from "react";
import { IDirections, IModes } from "types/date";
import Year from "../Year";

import styles from './Years.module.scss';

interface YearsProps {
  selectedYearsInterval: number[];
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  setMode: (mode: IModes) => void;
  onClickArrow: (direction: IDirections) => void;
}

const Years: React.FC<YearsProps> = ({
  selectedYearsInterval,
  selectedYear,
  setSelectedYear,
  setMode,
  onClickArrow
}) => {
  const handleSelectPrevYearsInterval = () => {
    onClickArrow('left');
    setSelectedYear(selectedYearsInterval[0] - 1);
    setMode('months');
  }

  const handleSelectNextYearsInterval = () => {
    onClickArrow('right');
    setSelectedYear(selectedYearsInterval[selectedYearsInterval.length - 1] + 1);
    setMode('months');
  }

  return (
    <div className={styles.years_container}>
      <div
        className={styles.year_additional}
        onClick={handleSelectPrevYearsInterval}
      >
        {selectedYearsInterval[0] - 1}
      </div>
      {selectedYearsInterval.map((year) => (
        <Year
          key={year}
          year={year}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          setMode={setMode}
        />
      ))}
      <div
        className={styles.year_additional}
        onClick={handleSelectNextYearsInterval}
      >
        {selectedYearsInterval[selectedYearsInterval.length - 1] + 1}
      </div>
    </div>
  );
};

export default Years;