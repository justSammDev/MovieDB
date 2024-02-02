import { SearchIcon } from "lucide-react";
import { useState } from "react";

const Search = ({ onSearch, pageNo }) => {
  const [query, setQuery] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = (event) => {
    const searchQuery = event.target.value;
    if (!searchQuery.startsWith(" ") || searchQuery.trim() !== "") {
      setQuery(searchQuery);
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      onSearch(searchQuery, pageNo);
    }, 300);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="flex justify-center items-center w-3/4 gap-3 py-10 ">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="text-black border border-gray-300 w-3/5 rounded-full px-4 py-2 outline-none focus:border-blue-500 "
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
