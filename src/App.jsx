import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchListPage from "./pages/WatchListPage";
import WatchedPage from "./pages/WatchedPage";
import WatchListMovieDetail from "./components/WatchListMovie";
import WatchedListMovieDetail from "./components/WatchedListMovie";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./pages/ErrorPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />

      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <WatchListPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watchlist/:id"
        element={
          <ProtectedRoute>
            <WatchListMovieDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watched"
        element={
          <ProtectedRoute>
            <WatchedPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/watched/:id"
        element={
          <ProtectedRoute>
            <WatchedListMovieDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
