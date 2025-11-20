import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchListPage from "./pages/WatchListPage";
import WatchedPage from "./pages/WatchedPage";
import WatchedListMovieDetail from "./pages/WatchedListMovieDetail";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/watchlist" element={<WatchListPage />} />
      <Route path="/watched" element={<WatchedPage />} />
      <Route path="/watchlist/:id" element={<WatchedListMovieDetail />} />
    </Routes>
  );
}

export default App;
