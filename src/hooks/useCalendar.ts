import { useState, useMemo } from 'react';
import { IDirections, IModes } from 'types/date';

import {
  getMonthesNames,
  createMonth,
  getWeekDaysNames,
  createDate,
  createWeek,
  getCalendarDaysOfMonth,
  checkDateIsEqual,
  getCalendarDaysOfYear
} from 'utils/date';

interface UseCalendarParams {
  locale?: string;
  selectedDate: Date;
  firstWeekDayNumber?: number;
  defaultMode?: IModes;
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
  firstWeekDayNumber = 2,
  defaultMode = 'week'
}: UseCalendarParams) => {
  const [mode, setMode] = useState<IModes>(defaultMode);
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [selectedWeek, setSelectedWeek] = useState(createWeek({ date: selectedDay.date, locale }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale })
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(
    getYearsInterval(selectedDay.year)
  );

  const monthesNames = useMemo(() => getMonthesNames(selectedDay.date, locale), [selectedDay]);
  const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);
  const weekDays = useMemo(() => selectedWeek.createWeekDays(), [selectedWeek.dayNumber, selectedYear, selectedMonth.monthIndex]);
  const displayedDate = useMemo(() => {
    if (mode === 'year') {
      return `${selectedYear}`;
    }
    if (mode === 'month') {
      return `${monthesNames[selectedMonth.monthIndex].month} ${selectedYear}`;
    }
    return selectedWeek.displayedMonth;
  }, [selectedYear, selectedMonth.monthIndex, selectedWeek.dayNumber, mode]);

  const calendarDaysOfMonth = useMemo(() => {
    return mode !== 'month'
      ? []
      : getCalendarDaysOfMonth({ year: selectedYear, monthIndex: selectedMonth.monthIndex, firstWeekDayNumber })
  }, [selectedYear, selectedMonth.monthIndex, mode]);

  const calendarDaysOfYear = useMemo(() => {
    if (mode !== 'year') {
      return [];
    }

    return getCalendarDaysOfYear({ year: selectedYear, firstWeekDayNumber });
  }, [selectedYear, mode]);

  const onChangeState = (date: Date) => {
    const { year, monthIndex } = createDate({ date });
    const isCurrentYear = year === selectedYear;
    const isCurrentMonth = monthIndex === selectedMonth.monthIndex;

    void (!isCurrentYear && setSelectedYear(year));
    void (!(isCurrentYear && isCurrentMonth) && setSelectedMonth(createMonth({ date, locale })));
    void (!checkDateIsEqual(date, selectedWeek.date) && setSelectedWeek(createWeek({ date, locale })));
    void (!checkDateIsEqual(date, selectedDay.date) && setSelectedDay(createDate({ date })));
  }

  const onClickArrow = (direction: IDirections) => {
    if (direction === 'today') {
      return onChangeState(new Date());
    }

    if (mode === 'year') {
      const year = selectedYear + (direction === 'left' ? -1 : 1);
      return onChangeState(new Date(year, 0, 1));
    }

    if (mode === 'month') {
      const month = selectedMonth.monthIndex + (direction === 'left' ? -1 : 1);
      return onChangeState(new Date(selectedMonth.year, month, 1));
    }

    if (mode === 'week') {
      const dayNumber = selectedWeek.dayNumber + (direction === 'left' ? -7 : 7);
      const newSelectedWeekDate = new Date(selectedWeek.year, selectedWeek.monthIndex, dayNumber);
      onChangeState(newSelectedWeekDate);
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
  };

  return {
    state: {
      mode,
      calendarDaysOfMonth,
      calendarDaysOfYear,
      displayedDate,
      weekDaysNames,
      weekDays,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedYear,
      onChangeState,
      setSelectedMonthByIndex,
      setSelectedYearsInterval
    }
  };
};
