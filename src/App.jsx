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
import TaskSort from "./components/TaskSort";

function App() {
  // state initialization happens only once later only existing data used
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [filters, setFilters] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
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
      createdAt: Date.now(),
      priority: "medium",
    };
    setTasks((prev) => [newTask, ...prev]);
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
  const editTask = (newTitle, priority) => {
    console.log(priority);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title: newTitle,
              priority: priority.toLowerCase(),
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

  const changeSort = (sortValue) => {
    setSortBy(sortValue);
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
      task?.title?.toLowerCase().includes(searchQuery?.toLowerCase()),
    );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") {
      return b.createdAt - a.createdAt;
    }

    if (sortBy === "oldest") {
      return a.createdAt - b.createdAt;
    }

    if (sortBy === "priority") {
      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return 0;
  });

  return (
    <MainLayout activePage={activePage} onChangePage={setActivePage}>
      {toast && <Toast toast={toast} />}
      {activePage === "dashboard" && <Dashboard tasks={tasks} />}
      {activePage === "tasks" && (
        <div className="bg-white p-7 w-full h-full">
          <h2 className="text-blue-600 mb-4 text-2xl font-bold">My Tasks</h2>
          <TaskSearch searchQuery={searchQuery} onSearch={handleSearch} />
          <TaskInput onAdd={addTask} />

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <TaskFilters filters={filters} onChangeFilter={changeFilter} />
            <TaskSort sort={sortBy} onChangeSort={changeSort} />
          </div>

          <TaskList
            tasks={sortedTasks}
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
      {console.log(sortedTasks)}
    </MainLayout>
  );
}

export default App;
