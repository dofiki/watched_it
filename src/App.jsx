import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchListPage from "./pages/WatchListPage";
import WatchedPage from "./pages/WatchedPage";
import WatchListMovieDetail from "./components/WatchListMovieDetail";
import WatchedListMovieDetail from "./components/WatchedListMovieDetail";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/watchlist" element={<WatchListPage />} />
      <Route path="/watchlist/:id" element={<WatchListMovieDetail />} />
      <Route path="/watched" element={<WatchedPage />} />
      <Route path="/watched/:id" element={<WatchedListMovieDetail />} />
    </Routes>
  );
}

export default App;
