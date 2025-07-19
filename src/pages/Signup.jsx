import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState(false);
  const [arrivalTime, setArrivalTime] = useState(null);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    login("user", name);
    setSuccess(true);
    setTimeout(() => {
      setBooking(true);
      // Simulate vehicle arrival time (2-8 min random)
      const min = 2, max = 8;
      const eta = Math.floor(Math.random() * (max - min + 1)) + min;
      setArrivalTime(eta);
      setTimeout(() => {
        navigate("/booking");
      }, 2000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form onSubmit={handleSignup} className="backdrop-blur-lg bg-white/60 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900 drop-shadow-lg">Sign Up</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-purple-400"
        />
        {error && <div className="text-red-600 mb-2 font-semibold">{error}</div>}
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded w-full font-bold hover:bg-purple-600 transition">Sign Up</button>
        {success && (
          <div className="text-green-600 mt-4 font-bold text-center">
            Signup successful! <br />
            <button
              type="button"
              className="mt-4 bg-black text-white px-4 py-2 rounded font-bold hover:bg-gray-800 transition"
              onClick={() => {
                setBooking(true);
                const min = 2, max = 8;
                const eta = Math.floor(Math.random() * (max - min + 1)) + min;
                setArrivalTime(eta);
                setTimeout(() => {
                  navigate("/booking");
                }, 2000);
              }}
              disabled={booking}
            >Book Now</button>
            {booking && (
              <div className="mt-4 text-blue-700 text-lg font-semibold">
                Your vehicle will arrive in {arrivalTime} minutes!
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;