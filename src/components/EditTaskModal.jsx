import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
const EditTaskModal = ({ editingTask, onSave, onCancle }) => {
  const [editTitle, setEditTitle] = useState(editingTask?.title || "");

  const inputRef = useRef(null);

  useEffect(() => {
    setEditTitle(editingTask?.title || "");
    inputRef.current?.focus(); // autofocus on open
  }, [editingTask]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancle();
      }
      if (e.key === "Enter") {
        if (editTitle.trim() !== "") {
          onSave(editTitle);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancle, editTitle, onSave]);
  if (!editingTask) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm  flex items-center justify-center z-50"
      onClick={onCancle}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 shadow-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <input
          value={editTitle}
          ref={inputRef}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded mb-4 focus:outline-none "
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onSave(editTitle)}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onCancle}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancle
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default EditTaskModal;
