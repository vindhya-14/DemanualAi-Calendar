"use client";

import { useEffect, useState } from "react";
import EventModal from "./EventModal";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day) => {
    if (!day) return;
    const dateString = `${currentYear}-${currentMonth + 1}-${day}`;
    setSelectedDate(dateString);
    setShowModal(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleDeleteEvent = (date, index) => {
    const updated = events.filter((e, i) => !(e.date === date && i === index));
    setEvents(updated);
  };

  // Calendar grid generation
  const grid = [];
  for (let i = 0; i < firstDayOfMonth; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4 md:p-10 pt-28"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/02/65/32/32/360_F_265323269_QoipYNMdd97ZbQJGlSN5TLBXxRUoe0ju.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentYear}
          </h2>

          {/* Month Navigation */}
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentYear, currentMonth - 1, currentDate.getDate())
                )
              }
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition text-base"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentYear, currentMonth + 1, currentDate.getDate())
                )
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base"
            >
              Next
            </button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center font-semibold text-gray-700 border-b pb-3 text-lg">
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3 mt-3">
          {grid.map((day, index) => {
            const dateString = day
              ? `${currentYear}-${currentMonth + 1}-${day}`
              : null;
            const dayEvents = events.filter((e) => e.date === dateString);

            const isToday =
              day &&
              new Date().toDateString() ===
                new Date(currentYear, currentMonth, day).toDateString();

            return (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`min-h-28 border rounded-xl p-2 flex flex-col cursor-pointer transition-all overflow-hidden ${
                  day
                    ? "hover:bg-blue-50 border-gray-200 bg-white/70 backdrop-blur-sm"
                    : "bg-gray-100/50 border-gray-100 cursor-default"
                } ${isToday ? "border-blue-500 ring-2 ring-blue-300" : ""}`}
                style={{
                  maxHeight: "180px",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                }}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-semibold text-lg ${
                      isToday ? "text-blue-600" : "text-gray-800"
                    }`}
                  >
                    {day || ""}
                  </span>
                </div>

                {/* Event List */}
                <div className="mt-2 space-y-2">
                  {dayEvents.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-center">
                     
                    </p>
                  ) : (
                    dayEvents.map((event, i) => (
                      <div
                        key={i}
                        className="text-sm bg-blue-100 text-blue-800 px-3 py-1.5 rounded-md flex justify-between items-center shadow-sm"
                      >
                        <span className="font-medium truncate w-3/4">
                          {event.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(
                              event.date,
                              events.indexOf(event)
                            );
                          }}
                          className="text-red-500 hover:text-red-700 font-bold text-lg"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </main>
  );
}
