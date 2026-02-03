import { useEffect, useState } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import EditTaskModal from "./components/EditTaskModal";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";
import TaskSearch from "./components/TaskSearch";

function App() {
  // state initialization happens only once later only existing data used
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filters, setFilters] = useState("all");
  const [toast, setToast] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [activePage, setActivePage] = useState("tasks");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addTask = (title) => {
    const newTask = {
      id: Math.random(),
      title: title,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    showToast("Task added successfully", "success");
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
    showToast("Task deleted successfully", "success");
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
    showToast("Task updated successfully", "success");
  };
  const changeFilter = (filter) => {
    setFilters(filter);
  };

  const handleCancelEdit = () => {
    console.log("cancle clicked");
    setEditingTask(null);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filters === "active") return !task.completed;
      if (filters === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  return (
    <MainLayout activePage={activePage} onChangePage={setActivePage}>
      {toast && <Toast toast={toast} />}
      {activePage === "dashboard" && <Dashboard tasks={tasks} />}
      {activePage === "tasks" && (
        <div className="bg-white p-7 w-full h-full">
          <h2 className="text-blue-600 mb-4 text-2xl font-bold">My Tasks</h2>
          <TaskSearch searchQuery={searchQuery} onSearch={handleSearch} />
          <TaskInput onAdd={addTask} />

          <div className="mt-4">
            <TaskFilters filters={filters} onChangeFilter={changeFilter} />
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={handleEditingTask}
            searchQuery={searchQuery}
            filters={filters}
          />

          {editingTask && (
            <EditTaskModal
              editingTask={editingTask}
              onCancle={handleCancelEdit}
              onSave={editTask}
            />
          )}
        </div>
      )}
    </MainLayout>
  );
}

export default App;
