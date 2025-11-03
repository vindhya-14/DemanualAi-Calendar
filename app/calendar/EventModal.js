"use client";

import { useState } from "react";

export default function EventModal({ selectedDate, onClose, onAddEvent }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newEvent = {
      title,
      date: selectedDate,
    };
    onAddEvent(newEvent);
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 md:w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Add Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-semibold">
              Event Title
            </label>
            <input
              type="text"
              placeholder="e.g. Team meeting, Birthday..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center text-gray-600 text-sm">
            Selected Date:{" "}
            <span className="font-semibold text-blue-600">{selectedDate}</span>
          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
