import React, { useEffect, useRef } from 'react';

import { createDate } from "utils/date";
import styles from "./TimeLine.module.scss";

const MINUTE_IN_MILLISECONDS = 1000 * 60;

interface ITimeLineProps {
  setCurrentDate: (date: Date) => void;
  currentDate: Date;
}

const TimeLine: React.FC<ITimeLineProps> = ({ currentDate, setCurrentDate }) => {
  const { minutes, seconds } = createDate({ date: currentDate });

  const timerId = useRef<NodeJS.Timeout | null>(null);
  const timeLineStyles = { top: `${minutes}px` };

  const tick = () => setCurrentDate(new Date());

  const startTimer = () => {
    const delayForNextRender = MINUTE_IN_MILLISECONDS - (seconds * 1000);

    timerId.current = setTimeout(tick, delayForNextRender);
  }

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerId.current!)
  }, [currentDate]);

  return (
    <div
      className={styles.time_line}
      style={timeLineStyles}
    />
  );
}

export default TimeLine;
