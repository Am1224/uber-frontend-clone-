const RideOptionSelector = ({ selected, onSelect }) => {
  const options = ['Standard', 'Premium', 'Pool'];
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Ride Option:</label>
      <select value={selected} onChange={e => onSelect(e.target.value)} className="border p-2 rounded w-full">
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default RideOptionSelector;
