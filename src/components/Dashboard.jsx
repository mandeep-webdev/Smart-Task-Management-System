import React from "react";
import StatCard from "./StatCard";

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = totalTasks - completed;
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);
  return (
    <div className="bg-white p-7 h-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h2>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>No tasks yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Tasks" value={totalTasks} color="blue" />
            <StatCard label="Completed" value={completed} color="green" />
            <StatCard label="Pending" value={pending} color="red" />
            <StatCard
              label="Completion"
              value={`${completionPercentage}%`}
              color="blue"
            />
          </div>
          <div className="bg-gray-50 border rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Overall Progress</p>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {completionPercentage}% tasks completed
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
