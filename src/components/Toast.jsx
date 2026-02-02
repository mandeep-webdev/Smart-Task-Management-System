import React from "react";

const Toast = ({ toast }) => {
  const colorMap = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md ${colorMap[toast.type]}`}
    >
      {toast.msg}
    </div>
  );
};

export default Toast;
