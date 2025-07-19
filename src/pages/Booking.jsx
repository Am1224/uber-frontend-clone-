

const Booking = () => {
  const { user } = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState('Standard');
  const [selectedVehicle, setSelectedVehicle] = useState('Car');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupTime, setPickupTime] = useState('now');
  const [passenger, setPassenger] = useState('me');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [recentRides, setRecentRides] = useState([
    { id: 1, pickup: 'Police Bazar', dropoff: 'Golf Links', date: '2025-07-18', option: 'Standard', vehicle: 'Car' },
    { id: 2, pickup: 'Laban', dropoff: 'Shillong Cantt.', date: '2025-07-17', option: 'Premium', vehicle: 'SUV' }
  ]);

  // Simple price estimation
  const getPrice = () => {
    let base = selectedOption === 'Premium' ? 300 : selectedOption === 'Pool' ? 100 : 200;
    base += selectedVehicle === 'SUV' ? 100 : selectedVehicle === 'Bike' ? -50 : 0;
    return base;
  };

  const handleBooking = () => {
    setError('');
    setSuccess(false);
    if (!pickup || !dropoff) {
      setError('Please enter both pickup and dropoff locations.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setRecentRides([
        { id: Date.now(), pickup, dropoff, date: new Date().toISOString().slice(0,10), option: selectedOption, vehicle: selectedVehicle },
        ...recentRides
      ]);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Book a Ride</h2>
      <p className="mb-4">Welcome, {user?.name || "User"}! Choose your ride options below.</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pickup location"
          value={pickup}
          onChange={e => setPickup(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Dropoff location"
          value={dropoff}
          onChange={e => setDropoff(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <label className="block mb-1 font-semibold">Pickup time:</label>
        <select value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="border p-2 rounded w-full mb-2">
          <option value="now">Pickup now</option>
          <option value="later">Schedule for later</option>
        </select>
        <label className="block mb-1 font-semibold">Passenger:</label>
        <select value={passenger} onChange={e => setPassenger(e.target.value)} className="border p-2 rounded w-full mb-2">
          <option value="me">For me</option>
          <option value="someone">For someone else</option>
        </select>
      </div>
      <RideOptionSelector selected={selectedOption} onSelect={setSelectedOption} />
      <VehicleDropdown selected={selectedVehicle} onSelect={setSelectedVehicle} />
      <div className="mt-6">
        <RideCard
          option={selectedOption}
          vehicle={selectedVehicle}
          pickup={pickup}
          dropoff={dropoff}
          pickupTime={pickupTime}
          passenger={passenger}
        />
        <div className="mt-4">
          <div className="text-lg font-bold">Estimated Price: ₹{getPrice()}</div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={handleBooking}
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
        {error && <div className="mt-2 text-red-500">{error}</div>}
        {success && <div className="mt-2 text-green-600">Booking confirmed!</div>}
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-2">Recent Rides</h3>
        <ul>
          {recentRides.map(ride => (
            <li key={ride.id} className="border-b py-2 text-sm">
              {ride.date}: {ride.pickup} → {ride.dropoff} ({ride.option}, {ride.vehicle})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Booking;