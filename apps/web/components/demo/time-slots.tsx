"use client";

import { format } from "date-fns";
import { Clock } from "lucide-react";

interface TimeSlotsProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

export function TimeSlots({
  selectedDate,
  selectedTime,
  onTimeSelect,
}: TimeSlotsProps) {
  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  });

  if (!selectedDate) {
    return (
      <div className="p-4">
        <p className="text-white/50 text-center">
          Select a date to view available times
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-white font-medium mb-4">
        Available times for {format(selectedDate, "EEEE, MMMM d")}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`
              flex items-center justify-center gap-2 p-3 rounded-lg text-sm transition-colors
              ${
                selectedTime === time
                  ? "bg-[#CCFF00] text-black font-medium"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }
            `}
          >
            <Clock className="w-4 h-4" />
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
