import React from "react";
import { formatDifferenceOfTwoTimes } from "utils/date";

import styles from './TimeOption.module.scss';

interface ITimeOptionsProps {
  hours: string;
  mins: string;
  indx: number;
  selectedOptionId: number;
  isToday: boolean;
  isFullDay: boolean;
  timeFrom: string;
  locale: string;
  setSelectedOptionId: (optiondId: number) => void;
  selectTime: (time: string) => void;
  closeOptions: () => void;
}

const TimeOption: React.FC<ITimeOptionsProps> = ({
  hours,
  mins,
  indx,
  selectedOptionId,
  isToday,
  isFullDay,
  timeFrom,
  locale,
  setSelectedOptionId,
  selectTime,
  closeOptions
}) => {
  const time = `${hours}:${mins}`;

  const handleSelectOption = () => {
    selectTime(time);
    closeOptions();
  }

  const onMouseEnterSelectOption = () => setSelectedOptionId(indx);

  return (
    <div
      className={styles.option}
      key={`${hours}-${mins}-${indx}`}
      onMouseDown={handleSelectOption}
      aria-selected={selectedOptionId === indx}
      onMouseEnter={onMouseEnterSelectOption}
    >
      {
        isToday && !isFullDay
          ? `${time} (${formatDifferenceOfTwoTimes(timeFrom, time, locale)})`
          : time
      }
    </div>
  );
}

export default TimeOption;