import React, { useState, useEffect } from "react";
import { differenceInSeconds, differenceInMinutes } from "date-fns";
import { cn } from "@ui/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer = ({ targetDate, className }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const diff = differenceInSeconds(targetDate, new Date());
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatTimeLeft = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return <span className={cn("text-2xl font-bold", className)}>{formatTimeLeft(timeLeft)}</span>;
};

export { CountdownTimer };
