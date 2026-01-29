import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import EditTaskModal from "./components/EditTaskModal";

function App() {
  // state initialization happens only once later only existing data used
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filters, setFilters] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (title) => {
    const newTask = {
      id: Math.random(),
      title: title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const handleEditingTask = (task) => {
    setEditingTask(task);
  };
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const editTask = (newTitle) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTitle,
            }
          : task,
      ),
    );
    setEditingTask(null);
  };
  const changeFilter = (filter) => {
    setFilters(filter);
  };

  const handleCancelEdit = () => {
    console.log("cancle clicked");
    setEditingTask(null);
  };
  const filteredTasks = tasks.filter((task) => {
    if (filters === "active") return !task.completed;
    if (filters === "completed") return task.completed;
    return true;
  });
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Smart Task Manager
        </h1>
        <TaskInput onAdd={addTask} />
        <TaskFilters filters={filters} onChangeFilter={changeFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={handleEditingTask}
        />
        {editingTask && (
          <EditTaskModal
            editingTask={editingTask}
            onCancle={handleCancelEdit}
            onSave={editTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
