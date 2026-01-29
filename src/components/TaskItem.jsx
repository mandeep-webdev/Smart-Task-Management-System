function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-3 py-3 items-center border-b border-b-gray-200">
      {/* Task name */}
      <div className="col-span-6 flex items-center gap-3">
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

      {/* Actions */}
      <div className="col-span-3 text-right">
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
