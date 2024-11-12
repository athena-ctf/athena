"use client";

import type { CtfConfig } from "@repo/config/schema";
import { add, addDays, endOfDay, format, intervalToDuration, isBefore, parseISO } from "date-fns";
import React from "react";
import { useEffect, useState } from "react";

export function CtfTimer({ config }: { config: CtfConfig }) {
  const now = new Date();
  const endOfToday = endOfDay(now);

  const endDate = addDays(parseISO(config.ctf.start_time), config.ctf.duration);
  const remainingHours = endOfToday.getHours() - now.getHours();
  const nextDayAndExtraTime = add(now, {
    hours: remainingHours + 4,
    seconds: 1,
  });

  const [countdown, setCountdown] = useState("");
  const [countdownEnded, setCountdownEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });

      if (isBefore(endDate, now)) {
        setCountdownEnded(true);
        clearInterval(interval);
      } else {
        setCountdown(
          `${duration.days ?? "00"}:${duration.minutes ?? "00"}:${duration.seconds ?? "00"}`,
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      {!endDate && format(nextDayAndExtraTime, "MMMM do, yyyy  ")}
      {endDate && format(endDate, "MMMM do, yyyy  ")}
      {!countdownEnded && countdown}
      {countdownEnded && "00:00:00"}
    </div>
  );
}
