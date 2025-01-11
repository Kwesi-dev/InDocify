"use client";

import { Globe, Video } from "lucide-react";

export function MeetingDetails() {
  return (
    <div className="p-4 space-y-4 border-t border-white/10">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <Video className="w-4 h-4 text-[#CCFF00]" />
        </div>
        <div>
          <h3 className="text-white font-medium">InDocify Product Demo</h3>
          <p className="text-white/50 text-sm">30 minutes, Google Meet</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          <Globe className="w-4 h-4 text-[#CCFF00]" />
        </div>
        <div className="flex-1">
          <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent">
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="America/New_York">Eastern Time - US & Canada</option>
            <option value="America/Los_Angeles">
              Pacific Time - US & Canada
            </option>
            <option value="Europe/London">London</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
      </div>
    </div>
  );
}
