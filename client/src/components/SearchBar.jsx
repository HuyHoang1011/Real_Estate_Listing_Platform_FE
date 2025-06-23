import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <input
      type="text"
      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Search by city, area, or keywords..."
      value={query}
      onChange={handleChange}
    />
  );
}
