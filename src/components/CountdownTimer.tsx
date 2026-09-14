import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  eventDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (eventDate: string): TimeLeft => {
  const difference = new Date(eventDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(eventDate),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(eventDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const hasEnded =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (hasEnded) {
    return (
      <p className="text-sm font-medium text-red-500">
        This event has already started or ended.
      </p>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">Event starts in</p>
      <div className="grid grid-cols-4 gap-2">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
        <CountdownUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

interface CountdownUnitProps {
  value: number;
  label: string;
}

const CountdownUnit: React.FC<CountdownUnitProps> = ({ value, label }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg py-3 text-center">
      <p className="text-xl font-bold text-slate-800">
        {value.toString().padStart(2, "0")}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
};

export default CountdownTimer;
