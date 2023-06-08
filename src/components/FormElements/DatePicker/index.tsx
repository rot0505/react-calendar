import React, { useEffect, useRef, useState } from "react";

import { useCalendar } from "hooks/useCalendar";
import { useClickOutside } from "hooks/useClickOutside";
import { formatDate } from "utils/date";
import { getTextWidthFromInput } from "./helpers";
import DateInput from "./DateInput";
import MiniCalendar from "./MiniCalendar";
import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  error?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectDate, selectedDate, error }) => {
  const { functions, state } = useCalendar({
    selectedDate,
    defaultMode: "month",
  });
  const [dateValue, setDateValue] = useState(formatDate(selectedDate, "DDDD, DD MMMM YYYY"));
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [stylesPicker, setStylesPicker] = useState({ width: 200 });

  const miniCalendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openMiniCalendar = () => setIsOpen(true);
  const closeMiniCalendar = () => {
    setIsOpen(false);
    functions.setMode("month");
    functions.onChangeState(selectedDate);
  };

  const changeAllStates = (date: Date) => {
    functions.onChangeState(date);
    if (!isTyping) {
      const formatedDate = formatDate(date, "DDDD, DD MMMM YYYY");
      setDateValue(formatedDate);
      handleChangeWidthPicker(getTextWidthFromInput(formatedDate, inputRef.current!));
    }
  };

  const onSelectDay = (date: Date) => {
    functions.onChangeState(date);
    selectDate(date);
    closeMiniCalendar();
  };

  const handleChangeWidthPicker = (width: number) => setStylesPicker({ width: width });

  useClickOutside(miniCalendarRef, closeMiniCalendar);

  useEffect(() => {
    handleChangeWidthPicker(getTextWidthFromInput(dateValue, inputRef.current!));
  }, []);

  useEffect(() => {
    changeAllStates(selectedDate);
  }, [selectedDate]);

  return (
    <div className={styles.date_picker_container} style={stylesPicker} ref={miniCalendarRef}>
      <DateInput
        dateValue={dateValue}
        selectedDate={selectedDate}
        onFocus={openMiniCalendar}
        openMiniCalendar={openMiniCalendar}
        closeMiniCalendar={closeMiniCalendar}
        setDateValue={setDateValue}
        setIsTyping={setIsTyping}
        selectDate={selectDate}
        error={error}
        handleChangeWidthPicker={handleChangeWidthPicker}
        ref={inputRef}
      />
      {(isOpen || isTyping) && (
        <div className={styles.date_picker_calendar}>
          <MiniCalendar
            selectedYearsInterval={state.selectedYearsInterval}
            onClickArrow={functions.onClickArrow}
            monthsNames={state.monthsNames}
            selectedYear={state.selectedYear}
            selectedMonth={state.selectedMonth}
            weekDaysNames={state.weekDaysNames}
            calendarDaysOfMonth={state.calendarDaysOfMonth}
            selectDay={onSelectDay}
            selectedDate={selectedDate}
            setMode={functions.setMode}
            mode={state.mode}
            setSelectedMonthByIndex={functions.setSelectedMonthByIndex}
            setSelectedYear={functions.setSelectedYear}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
