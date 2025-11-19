import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchListPage from "./pages/WatchListPage";
import WatchedPage from "./pages/WatchedPage";
import WatchedMovieDetail from "./pages/WatchedMovieDetail";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/watchlist" element={<WatchListPage />} />
      <Route path="/watched" element={<WatchedPage />} />
      <Route path="/watched/:id" element={<WatchedMovieDetail />} />
    </Routes>
  );
}

export default App;
