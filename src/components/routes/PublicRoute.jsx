import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/" replace />;

  return children;
}
