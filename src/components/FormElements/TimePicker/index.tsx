import React, { useRef, useState, useEffect, useMemo } from 'react';

import { useClickOutside } from 'hooks/index';
import { generateTimesForDay } from 'utils/date';
import { getOptionIndx, parseTimeString } from './helpers';
import TimeInput from './TimeInput';
import TimeOption from './TimeOption';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
  timeFrom: string;
  selectedTime: string;
  isFullDay?: boolean;
  error?: string;
  isToday?: boolean;
  locale?: string;
  selectTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  timeFrom,
  error,
  isFullDay = false,
  isToday = false,
  locale = 'default',
  selectTime,
}) => {
  const [timeValue, setTimeValue] = useState(selectedTime);
  const [isOpen, setIsOpen] = useState(false);

  const times = useMemo(() => (
    generateTimesForDay((isFullDay || !isToday) ? '00:00' : timeFrom, isFullDay)
  ), [timeFrom, isFullDay, isToday]);

  const [selectedOptionId, setSelectedOptionId] = useState(getOptionIndx(times, timeValue));

  const timePickerRef = useRef<HTMLDivElement>(null);
  const optionContainerRef = useRef<HTMLInputElement>(null);

  const openOptions = () => setIsOpen(true);
  const closeOptions = () => setIsOpen(false);

  const onSelectTime = (hours: string, mins: string, withClose = false) => {
    const time = `${hours}:${mins}`;
    setTimeValue(time);
    selectTime(time);
    void (withClose && closeOptions());
  }

  const scrollToOption = (optiondId: number) => {
    if (!Number.isInteger(optiondId) || optiondId < 0) {
      return;
    }
    const heightOption = optionContainerRef.current!.children[0].getBoundingClientRect().height;
    const heightContainer = optionContainerRef.current!.getBoundingClientRect().height;
    const positionY = heightOption * optiondId - (heightContainer / 2 - heightOption / 2);
    optionContainerRef.current!.scrollTo(0, positionY);
  }

  useClickOutside(timePickerRef, closeOptions);

  useEffect(() => {
    if (isOpen) {
      scrollToOption(selectedOptionId);
    }
  }, [isOpen]);

  useEffect(() => {
    const { time } = parseTimeString(selectedTime);
    const optionIndx = getOptionIndx(times, time);

    setSelectedOptionId(optionIndx);
    setTimeValue(time);
  }, [selectedTime]);

  return (
    <div
      className={styles.time_picker}
      ref={timePickerRef}
    >
      <TimeInput
        timeValue={timeValue}
        times={times}
        selectedOptionId={selectedOptionId}
        error={error}
        openOptions={openOptions}
        setTimeValue={setTimeValue}
        onSelectTime={onSelectTime}
        setSelectedOptionId={setSelectedOptionId}
        scrollToOption={scrollToOption}
        selectTime={selectTime}
        closeOptions={closeOptions}
        onFocus={openOptions}
      />
      {isOpen && (
        <div className={styles.time_picker_options_container}>
          <div
            className={styles.time_picker_options}
            ref={optionContainerRef}
          >
            {times.map(([hours, mins], indx) => (
              <TimeOption
                key={`${hours}-${mins}-${indx}`}
                hours={hours}
                mins={mins}
                indx={indx}
                selectedOptionId={selectedOptionId}
                setSelectedOptionId={setSelectedOptionId}
                selectTime={selectTime}
                closeOptions={closeOptions}
                isToday={isToday}
                isFullDay={isFullDay}
                timeFrom={timeFrom}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimePicker;