import React, { useState, useEffect } from "react";

export const Calendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();
  const currentDay = date.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar: React.ReactNode[] = [];

  let dayCounter = 1;

  for (let week = 0; week < 6; week++) {
    const row: React.ReactNode[] = [];
    for (let day = 0; day < 7; day++) {
      if ((week === 0 && day < firstDay) || dayCounter > daysInMonth) {
        row.push(<td key={`empty-${week}-${day}`}></td>);
      } else {
        row.push(
          <td
            key={dayCounter}
            className={
              dayCounter < currentDay
                ? "highlight"
                : dayCounter === currentDay
                ? "today"
                : ""
            }
          >
            <p>{dayCounter}</p>
            {dayCounter < currentDay && (
              <img
                src="/assets/x.png"
                alt="Completed"
                className="checkmark-icon"
              />
            )}
            {dayCounter === currentDay && (
              <img src="/assets/today.png" alt="Today" className="today-icon" />
            )}
          </td>
        );
        dayCounter++;
      }
    }
    calendar.push(<tr key={week}>{row}</tr>);
  }

  return (
    <div className="calendar" id="test">
      <h2>{date.toLocaleString("default", { month: "long" })}</h2>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tues</th>
            <th>Wed</th>
            <th>Thurs</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{calendar}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
