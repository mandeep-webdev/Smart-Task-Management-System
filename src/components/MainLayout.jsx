function MainLayout({ activePage, onChangePage, children }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Smart Tasks</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChangePage("dashboard")}
            className={`text-left ${activePage === "dashboard" ? "text-blue-400 text-left" : ""} `}
          >
            Dashboard
          </button>

          <button
            onClick={() => onChangePage("tasks")}
            className={`text-left ${activePage === "tasks" ? "text-blue-400 text-left" : ""}`}
          >
            My Tasks
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-3 bg-gray-100">{children}</main>
    </div>
  );
}

export default MainLayout;
