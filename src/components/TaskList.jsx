import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  searchQuery,
  filters,
}) => {
  let emptyMessage = "";

  if (tasks.length === 0) {
    if (searchQuery) {
      emptyMessage = "No results found";
    } else if (filters !== "all") {
      emptyMessage = "No tasks match this filter";
    } else {
      emptyMessage = "No tasks yet. Add one to get started.";
    }
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-17 gap-4 px-3 py-2 text-sm font-semibold text-gray-500 border-b border-b-gray-200">
        <div className="col-span-7">Task</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-4">Priority</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {tasks.length === 0 && (
        <div className="py-10 flex flex-col items-center justify-center text-center text-gray-400">
          <p className="text-sm">{emptyMessage}</p>
        </div>
      )}

      {tasks.length > 0 &&
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </div>
  );
};

export default TaskList;
