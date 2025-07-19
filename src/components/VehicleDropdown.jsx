const VehicleDropdown = ({ selected, onSelect }) => {
  const vehicles = ['Car', 'SUV', 'Bike'];
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Vehicle Type:</label>
      <select value={selected} onChange={e => onSelect(e.target.value)} className="border p-2 rounded w-full">
        {vehicles.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
};

export default VehicleDropdown;
