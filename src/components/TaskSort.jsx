import React from "react";

const TaskSort = ({ sort, onChangeSort }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-500">Sort by</label>

      <select
        className="px-3 py-2 text-sm border border-gray-300 rounded-lg
               bg-white text-gray-700 focus:outline-none
               focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onChangeSort(e.target.value)}
        value={sort}
      >
        <option value="priority">Priority</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default TaskSort;
