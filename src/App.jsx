import HomePage from "./pages/HomePage"
import  SearchPage  from "./pages/SearchPage"
import { Routes, Route } from "react-router-dom"
import WatchListPage from "./pages/WatchListPage"

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/search" element={<SearchPage />}/>
      <Route path="/watchlist" element={<WatchListPage />} />
    </Routes>
    </>
  )
}

export default App