import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext)

  if (!user) return <Navigate to="/login/user" />
  if (user.role !== role) return <Navigate to="/" />

  return children
}

export default ProtectedRoute
