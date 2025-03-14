import React, { useState, useEffect } from 'react';
import ClockIMG from './assets/clock-clean.png';

export const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            // Update the time without seconds
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="clock-container">
            <img className="clock" src={ClockIMG} alt="Clock" />
            <span>{time}</span>
        </div>
    );
};

export default Clock;



