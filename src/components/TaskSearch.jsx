function TaskSearch({ searchQuery, onSearch }) {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search tasks..."
      className="w-full h-5 mb-4 px-3 py-4 border border-gray-300 rounded-md focus:outline-none "
    />
  );
}

export default TaskSearch;
