import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 gap-4 px-3 py-2 text-sm font-semibold text-gray-500 border-b border-b-gray-200">
        <div className="col-span-6">Task</div>
        <div className="col-span-3">Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>
      {tasks.length === 0 ? (
        <div className="py-10 flex flex-col items-center justify-center text-center text-gray-400">
          <p className="text-sm">No tasks yet. Add one to get started.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
