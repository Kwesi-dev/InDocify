"use client";

import PageLayout from "@/components/layout";
import { Check, AlertTriangle, Clock, Activity } from "lucide-react";
import { useState } from "react";

interface Service {
  name: string;
  status: "operational" | "degraded" | "maintenance";
  uptime: string;
  lastIncident?: string;
}

const services: Service[] = [
  {
    name: "API",
    status: "operational",
    uptime: "99.99%",
  },
  {
    name: "Documentation Platform",
    status: "operational",
    uptime: "99.98%",
  },
  {
    name: "GitHub Integration",
    status: "operational",
    uptime: "99.95%",
  },
  {
    name: "AI Documentation Generation",
    status: "operational",
    uptime: "99.97%",
  },
  {
    name: "Search Service",
    status: "degraded",
    uptime: "99.85%",
    lastIncident: "Minor latency issues",
  },
  {
    name: "Collaboration Tools",
    status: "maintenance",
    uptime: "99.90%",
    lastIncident: "Scheduled maintenance",
  },
];

const incidents = [
  {
    date: "January 10, 2024",
    title: "Search Service Degraded Performance",
    status: "monitoring",
    updates: [
      {
        time: "15:45 UTC",
        message: "We are monitoring the system for any remaining issues.",
      },
      {
        time: "15:30 UTC",
        message:
          "The root cause has been identified and fixed. Service is recovering.",
      },
      {
        time: "15:00 UTC",
        message: "Investigating increased latency in search operations.",
      },
    ],
  },
];

export default function StatusPage() {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");

  const getStatusIcon = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return <Check className="w-5 h-5 text-green-400" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "maintenance":
        return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusText = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded";
      case "maintenance":
        return "Maintenance";
    }
  };

  const getStatusClass = (status: Service["status"]) => {
    switch (status) {
      case "operational":
        return "bg-green-400/10 text-green-400";
      case "degraded":
        return "bg-yellow-400/10 text-yellow-400";
      case "maintenance":
        return "bg-blue-400/10 text-blue-400";
    }
  };

  return (
    <PageLayout>
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Status Overview */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/10 rounded-full mb-6">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">
                  All Systems Operational
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                System Status
              </h1>
              <p className="text-white/70">
                Track the current status of inDocify services and view incident
                history
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "current"
                    ? "bg-[#CCFF00] text-black font-medium"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Current Status
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "history"
                    ? "bg-[#CCFF00] text-black font-medium"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Incident History
              </button>
            </div>

            {activeTab === "current" ? (
              /* Services Status */
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="bg-white/5 rounded-lg p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="text-white font-medium">
                          {service.name}
                        </h3>
                        <span
                          className={`text-sm ${getStatusClass(service.status)}`}
                        >
                          {getStatusText(service.status)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {service.uptime}
                      </div>
                      {service.lastIncident && (
                        <span className="text-sm text-white/50">
                          {service.lastIncident}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Incident History */
              <div className="space-y-8">
                {incidents.map((incident, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-white/50">
                          {incident.date}
                        </span>
                        <h3 className="text-white font-medium">
                          {incident.title}
                        </h3>
                      </div>
                      <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm">
                        {incident.status}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex gap-4">
                          <div className="w-24 flex-shrink-0">
                            <span className="text-sm text-white/50">
                              {update.time}
                            </span>
                          </div>
                          <p className="text-white/70">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
