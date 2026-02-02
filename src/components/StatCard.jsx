const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-600",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-600",
  },
};

function StatCard({ label, value, color = "blue" }) {
  const styles = colorMap[color];

  return (
    <div className={`rounded-lg p-4 border ${styles.bg} ${styles.border}`}>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-3xl font-bold ${styles.text}`}>{value}</p>
    </div>
  );
}

export default StatCard;
