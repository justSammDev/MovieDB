import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Nav from "./components/Nav";
import Movies from "./pages/Movies";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <div className="relative font-montserrat text-text">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvShows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
