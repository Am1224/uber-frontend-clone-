import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="mt-2">Welcome, {user?.name || "Admin"}! This is the admin dashboard.</p>
      {/* Add admin stats/components here */}
    </div>
  );
};

export default AdminDashboard;