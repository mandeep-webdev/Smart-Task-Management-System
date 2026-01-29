import React from "react";

const TaskFilters = ({ filters, onChangeFilter }) => {
  return (
    <div className="mb-6 flex items-center gap-3">
      <select
        value={filters}
        className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
        onChange={(e) => onChangeFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilters;
