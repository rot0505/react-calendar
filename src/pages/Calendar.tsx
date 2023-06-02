import React from 'react';
import { useCalendar } from 'hooks';
import Header from 'components/Header';
import CalendarWeek from 'components/CalendarWeek';

import './Calendar.scss';

const Calendar: React.FC = ({ }) => {
  const { state, functions } = useCalendar({ selectedDate: new Date() });

  return (
    <>
      <Header
        onClickArrow={functions.onClickArrow}
        displayedDate={state.displayedDate}
        onChangeOption={functions.setMode}
        selectedOption={state.mode}
        selectedDay={state.selectedDay}
      />
      <section className="calendar">
        {/* {state.mode === 'year' && (
          <YearCalendar
            selectedDay={state.selectedDay}
            selectedMonth={state.selectedMonth}
            monthsNames={state.monthsNames}
            weekDaysNames={state.weekDaysNames}
            calendarDaysOfYear={state.calendarDaysOfYear}
            onChangeState={functions.onChangeState}
          />
        )}

        {state.mode === 'month' && (
          <MonthCalendar
            weekDaysNames={state.weekDaysNames}
            calendarDaysOfMonth={state.calendarDaysOfMonth}
            selectedMonth={state.selectedMonth}
            onClickArrow={functions.onClickArrow}
          />
        )} */}

        {state.mode === 'week' && (
          <CalendarWeek
            weekDays={state.weekDays}
            weekDaysNames={state.weekDaysNames}
          />
        )}

      </section>
    </>
  );
}

export default Calendar;
