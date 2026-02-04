function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const priorityStyles = {
    high: "bg-green-100 text-green-700",
    medium: "bg-blue-100 text-blue-700",
    low: "bg-red-100 text-red-700",
  };

  return (
    <div className="grid grid-cols-17 gap-4 px-3 py-3 items-center border-b border-b-gray-200">
      {/* Task name */}
      <div className="col-span-7 flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5"
        />
        <span
          className={`${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.title}
        </span>
      </div>

      {/* Status */}
      <div className="col-span-3">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium
            ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>
      {/* Priority */}
      <div className="col-span-4">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>
      {/* Actions */}
      <div className="col-span-3 flex justify-end gap-3">
        <button
          className="text-blue-500 hover:text-blue-700 text-sm"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
