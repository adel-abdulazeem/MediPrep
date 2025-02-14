import { useState } from "react";


export default function searchMedi(){
    const [query, setQuery] = useState("");
    // Handle search input change
    const handleSearch = (e) => {
      setQuery(e.target.value);
    };

    return (
        <div className="search-container">
        <input
        type="text"
        value={query}
        placeholder="Search by ID or name..."
        onChange={(e) => setQuery(e.target.value)}
       />
      </div>
    )
}