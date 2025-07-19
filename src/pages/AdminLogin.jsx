import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login("admin", name || "Admin");
    navigate("/admin");
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="Admin Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Login as Admin</button>
    </form>
  );
};

export default AdminLogin;