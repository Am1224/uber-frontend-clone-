import React, { useState } from 'react';

// Static vehicle data
const VEHICLES = [
  { type: 'Auto', pricePerKm: 15 },
  { type: 'Bike', pricePerKm: 10 },
  { type: 'Car', pricePerKm: 25 },
];

// Example static locations (with OUTR College and estimates)
const SUGGESTED_LOCATIONS = [
  { pickup: 'Baramunda', dropoff: 'Railway Station', distance: 8.2 },
  { pickup: 'Ramanujan Hall', dropoff: 'Airport', distance: 12.5 },
  { pickup: 'Ghatikia Main Road', dropoff: 'Market Square', distance: 5.7 },
  { pickup: 'OUTR College', dropoff: 'Airport', distance: 13.0 },
  { pickup: 'OUTR College', dropoff: 'Railway Station', distance: 9.5 },
  { pickup: 'OUTR College', dropoff: 'Market Square', distance: 6.0 },
  { pickup: 'OUTR College', dropoff: 'Baramunda', distance: 3.2 },
];

function calculatePrice(distance, pricePerKm) {
  return (distance * pricePerKm).toFixed(2);
}

function Home() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicle, setVehicle] = useState('Car');
  const [booking, setBooking] = useState(false);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [distance, setDistance] = useState('');
  const [price, setPrice] = useState('');
  const [showPrices, setShowPrices] = useState(false);

  // Example previous rides
  const previousRides = [
    { id: 1, pickup: 'Unnamed Road', dropoff: 'Market Square', time: 'Dec 26 · 8:04 AM', price: 0, status: 'Canceled', vehicle: 'Auto', distance: 5.7 },
    { id: 2, pickup: 'OUTR Main gate', dropoff: 'Railway Station', time: 'Dec 26 · 6:25 AM', price: 120, status: 'Completed', vehicle: 'Auto', distance: 8.2 },
    { id: 3, pickup: 'Ghatikia Main Road', dropoff: 'Airport', time: 'Dec 24 · 4:20 AM', price: 0, status: 'Canceled', vehicle: 'Auto', distance: 12.5 },
    { id: 4, pickup: 'Ramanujan Hall of Residence', dropoff: 'Airport', time: 'Dec 9 · 12:28 PM', price: 114, status: 'Completed', vehicle: 'Car', distance: 12.5 },
    { id: 5, pickup: 'OUTR College', dropoff: 'Airport', time: 'Jan 2 · 9:00 AM', price: 325, status: 'Completed', vehicle: 'Car', distance: 13.0 },
    { id: 6, pickup: 'OUTR College', dropoff: 'Baramunda', time: 'Jan 3 · 10:30 AM', price: 48, status: 'Completed', vehicle: 'Auto', distance: 3.2 },
  ];

  // Simulate distance calculation (replace with real API/map logic)
  function handleCalculateDistance() {
    // If pickup/dropoff match a suggested location, use its distance
    const match = SUGGESTED_LOCATIONS.find(
      loc => loc.pickup.toLowerCase() === pickup.toLowerCase() && loc.dropoff.toLowerCase() === dropoff.toLowerCase()
    );
    let dist = match ? match.distance : Math.floor(Math.random() * 15) + 2;
    setDistance(dist);
    // Calculate price for selected vehicle
    const vehicleObj = VEHICLES.find(v => v.type === vehicle);
    setPrice(calculatePrice(dist, vehicleObj.pricePerKm));
    setShowPrices(true);
  }

  function handleBookNow() {
    setBooking(true);
    const min = 2, max = 8;
    const eta = Math.floor(Math.random() * (max - min + 1)) + min;
    setArrivalTime(eta);
  }

  function handleCancelRide() {
    setBooking(false);
    setArrivalTime(null);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Uber Header */}
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-5xl font-extrabold mb-6">Go anywhere with Uber</h1>
        <div className="bg-gray-50 rounded-2xl shadow p-6 mb-8">
          {/* Pickup & Dropoff */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-3 h-3 bg-black rounded-full"></span>
              <input
                type="text"
                placeholder="Pickup location"
                className="bg-gray-100 px-4 py-3 rounded-xl w-full text-lg"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
              />
              <span className="ml-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 12l12-4-4 12-2-6-6-2z" fill="#111"/></svg>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-black rounded-sm"></span>
              <input
                type="text"
                placeholder="Dropoff location"
                className="bg-gray-100 px-4 py-3 rounded-xl w-full text-lg"
                value={dropoff}
                onChange={e => setDropoff(e.target.value)}
              />
            </div>
          </div>
          {/* Date & Time */}
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Date</label>
              <input
                type="date"
                className="bg-gray-100 px-4 py-3 rounded-xl w-full text-lg"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Time</label>
              <input
                type="time"
                className="bg-gray-100 px-4 py-3 rounded-xl w-full text-lg"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>
          </div>
          {/* Calculate Distance & Show Prices */}
          <div className="flex gap-4 mb-4">
            <button
              className="bg-black text-white px-6 py-3 rounded-lg font-bold text-lg"
              onClick={handleCalculateDistance}
            >
              See prices
            </button>
            <span className="flex items-center text-gray-700 border-b border-gray-300 pb-1">Log in to see your recent activity</span>
          </div>
          {/* Vehicle Options & Prices */}
          {showPrices && (
            <div className="bg-gray-100 rounded-xl p-4 mt-2">
              <div className="font-bold mb-2">Choose your ride</div>
              <div className="flex gap-4">
                {VEHICLES.map(v => (
                  <button
                    key={v.type}
                    className={`px-4 py-2 rounded font-semibold border ${vehicle === v.type ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => {
                      setVehicle(v.type);
                      setPrice(calculatePrice(distance, v.pricePerKm));
                    }}
                  >
                    {v.type} <span className="text-xs text-gray-500">₹{v.pricePerKm}/km</span>
                  </button>
                ))}
              </div>
              <div className="mt-2 text-lg">
                Distance: <span className="font-bold">{distance} km</span> <br />
                Price: <span className="font-bold">₹{price}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Suggestions Section */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-3xl font-bold mb-4">Suggestions</h2>
        {SUGGESTED_LOCATIONS.map((loc, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl shadow p-4 flex items-center gap-4 mb-4">
            <div className="bg-white rounded-lg p-2 shadow">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#eee"/><rect x="7" y="10" width="10" height="6" rx="3" fill="#333"/></svg>
            </div>
            <div>
              <div className="font-bold text-xl">{loc.pickup} → {loc.dropoff}</div>
              <div className="text-gray-600 text-sm">Distance: {loc.distance} km</div>
            </div>
            <button
              className="bg-gray-200 px-3 py-1 rounded font-semibold text-sm"
              onClick={() => {
                setPickup(loc.pickup);
                setDropoff(loc.dropoff);
                setDistance(loc.distance);
                setShowPrices(false);
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {/* Previous Rides Section */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-3xl font-bold mb-4">Past</h2>
        {previousRides.map(ride => (
          <div key={ride.id} className="flex items-center gap-3 mb-3 bg-gray-50 rounded-lg p-2">
            <div className="bg-white rounded-lg p-2 shadow">
              {ride.vehicle === 'Auto' ? (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="8" rx="4" fill="#ffe600" stroke="#333"/><circle cx="8" cy="18" r="2" fill="#333"/><circle cx="16" cy="18" r="2" fill="#333"/></svg>
              ) : ride.vehicle === 'Bike' ? (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#eee"/><rect x="8" y="14" width="8" height="2" fill="#333"/><rect x="10" y="10" width="4" height="4" fill="#333"/></svg>
              ) : (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="6" y="10" width="12" height="6" rx="3" fill="#eee"/><rect x="9" y="13" width="6" height="3" rx="1.5" fill="#333"/></svg>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{ride.pickup} → {ride.dropoff}</div>
              <div className="text-gray-600 text-sm">{ride.time}</div>
              <div className="text-gray-700 text-sm">
                ₹{ride.price.toFixed(2)} {ride.status === 'Canceled' ? <span className="text-red-600">• Canceled</span> : null}
                <span className="ml-2 text-gray-500">{ride.vehicle} • {ride.distance} km</span>
              </div>
            </div>
            <button className="bg-gray-200 px-3 py-1 rounded font-semibold text-sm">See details</button>
          </div>
        ))}
      </div>
      {/* Book Now and Cancel Ride logic */}
      <button
        className="bg-black text-white px-6 py-3 rounded-lg font-bold w-full text-lg hover:bg-gray-900 transition mb-2"
        onClick={handleBookNow}
        disabled={booking || !pickup || !dropoff || !distance}
      >
        Book Now
      </button>
      {booking && (
        <div className="mt-2 text-blue-700 text-lg font-semibold text-center">
          Your {vehicle} will arrive in {arrivalTime} minutes!<br />
          <button
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-700 transition"
            onClick={handleCancelRide}
          >
            Cancel Ride
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;