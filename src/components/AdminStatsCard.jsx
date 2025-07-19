const AdminStatsCard = ({ label, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4 border border-gray-100">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm">{label}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default AdminStatsCard;
