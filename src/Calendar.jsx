import React, { useState, useEffect } from 'react';
import checkmark from './assets/check.jpeg'; 

export const Calendar = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000 * 60);
        return () => clearInterval(timer);
    }, []);

    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDay = date.getDate();

    // Get the first day of the month and total days in month
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate calendar grid
    const calendar = [];
    let dayCounter = 1;

    for (let week = 0; week < 6; week++) {
        let row = [];
        for (let day = 0; day < 7; day++) {
            if ((week === 0 && day < firstDay) || dayCounter > daysInMonth) {
                row.push(<td key={`empty-${week}-${day}`}></td>); // Empty cells before the first day
            } else {
                row.push(
                    <td key={dayCounter} className={dayCounter < currentDay ? 'highlight' : ''}>
                        <p>{dayCounter}</p>
                        {dayCounter < currentDay && (
                            <img src={checkmark} alt="Completed" className="checkmark-icon" />
                        )}
                    </td>
                );
                dayCounter++;
            }
        }
        calendar.push(<tr key={week}>{row}</tr>);
    }

    return (
        <div className="calendar">
            <h2>{date.toLocaleString('default', { month: 'long' })}</h2>
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
