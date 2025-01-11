"use client";

import { useState } from "react";
import Link from "next/link";
import PageLayout from "@/components/layout";
import { CalendarPicker } from "@/components/demo/calendar-picker";
import { TimeSlots } from "@/components/demo/time-slots";
import { MeetingDetails } from "@/components/demo/meeting-details";

export default function DemoPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSchedule = () => {
    // Handle scheduling logic
  };

  return (
    <PageLayout>
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Schedule a Demo with Our Team
            </h1>
            <p className="text-white/70 text-lg">
              Learn how InDocify can transform your documentation workflow in a
              personalized demo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-white/5 rounded-xl overflow-hidden">
            <div className="border-r border-white/10">
              <CalendarPicker
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
            <div className="flex flex-col">
              <TimeSlots
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
              <MeetingDetails />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Cancel
            </Link>
            <button
              onClick={handleSchedule}
              disabled={!selectedDate || !selectedTime}
              className="px-6 py-3 rounded-lg bg-[#CCFF00] text-black font-medium hover:bg-[#CCFF00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <p className="text-white/50 text-sm text-center">
            © {new Date().getFullYear()} InDocify. All rights reserved.
          </p>
        </div>
      </footer>
    </PageLayout>
  );
}
