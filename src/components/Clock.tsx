import { useState, useEffect } from "react";

export const Clock: React.FC = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-container">
      <img className="clock" src="/assets/clock-clean.png" alt="Clock" />
      <span>{time}</span>
    </div>
  );
};

export default Clock;
