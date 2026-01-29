import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex justify-between gap-3 mb-4">
      <input
        type="text"
        placeholder="Add task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full max-w-lg p-2
          border border-gray-300 rounded focus:outline-none"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-blue-500 text-white
        rounded hover:bg-blue-600 transition shrink-0"
      >
        Add
      </button>
    </form>
  );
};

export default TaskInput;
