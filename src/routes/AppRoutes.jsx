import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import UserLogin from '../pages/UserLogin'
import AdminLogin from '../pages/AdminLogin'
import Signup from '../pages/Signup'
import Booking from '../pages/Booking'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'

import Layout from '../components/Layout'
import ProtectedRoute from './ProtectedRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/login/user" element={<UserLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/booking" element={
        <ProtectedRoute role="user">
          <Layout><Booking /></Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute role="admin">
          <Layout><AdminDashboard /></Layout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
