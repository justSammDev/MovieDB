import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Nav from "./components/Nav";
import Movies from "./pages/Movies";
import Auth from "./pages/Auth";
import MovieDetail from "./components/Movie/MovieDetail";
import TVShowDetail from "./components/TVShow/TVShowDetail";
import UserDetail from "./pages/UserDetail";

export default function App() {
  return (
    <div className="relative font-montserrat flex  flex-col lg:gap-10 text-text">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvShows" element={<TVShows />} />
        <Route
          path="/tvShows/:mediaTitle/:mediaId"
          element={<TVShowDetail />}
        />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:mediaTitle/:mediaId" element={<MovieDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/user" element={<UserDetail />} />
      </Routes>
    </div>
  );
}
