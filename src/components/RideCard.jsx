
const RideCard = ({ option, vehicle, pickup, dropoff, pickupTime, passenger }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-2">Your Selection</h3>
      <p>Ride Option: <span className="font-semibold">{option}</span></p>
      <p>Vehicle: <span className="font-semibold">{vehicle}</span></p>
      <p>Pickup: <span className="font-semibold">{pickup || 'Not set'}</span></p>
      <p>Dropoff: <span className="font-semibold">{dropoff || 'Not set'}</span></p>
      <p>Pickup Time: <span className="font-semibold">{pickupTime === 'now' ? 'Now' : 'Later'}</span></p>
      <p>Passenger: <span className="font-semibold">{passenger === 'me' ? 'For me' : 'For someone else'}</span></p>
      {/* The Confirm Booking button is now handled in Booking.jsx */}
    </div>
  );
};

export default RideCard;
