import React from "react";
import { useState, useEffect } from "react";

const Timer = ({ deadline }: string) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mr-24 flex absolute  right-0">
      <p id="hour">{hours < 10 ? "0" + hours : hours}</p>:
      <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>:
      <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
    </div>
  );
};

export default Timer;
