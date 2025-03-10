// SearchMed.jsx
import { useState } from "react";
import { Search } from 'lucide-react';

export default function SearchMed() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/medication/searchAll/${query.toLocaleLowerCase().trim()}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSearchResults(data);
      setError("");
    } catch (err) {
      setError("Failed to search medications");
      console.error(err);
    }
  };

  return (
    <>
    <div className="medication-container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            placeholder="Search medication by name"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <Search />
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
      {searchResults.length > 0 && (
        <div className="medication-results">
          {searchResults.map(med => (
            <div key={med._id} className="medication-card">
              <h1>
                {`${med.brandName[0].toUpperCase()}${med.brandName.split('').slice(1).join('')}`} 
                ({med.genericName})
                </h1>
              <div className="stability">
                  <h4>Stability Times:</h4>
                  <ul>
                    {med.timeOfStability.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))}
                  </ul>
                </div>
                <div className="administration-methods">
                  <h4>Administration Methods:</h4>
                  <ul>
                    {med.methodOfAdministration.map((method, index) => (
                      <li key={index}>{method}</li>
                    ))}
                  </ul>
                </div>
              <div className="stability">
                <h4>Method of Preparation:</h4> 
                <ul>
                  <li>
                  {med.methodOfPreparation}
                  </li>
                  </ul>
              </div>
              <div className="administration-methods">
                  <h4>Compatible Solutions:</h4>
                  <ul>
                    {med.compatibleSolutions.map((solution, index) => (
                      <li key={index}>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              <div className="stability">
                <h4>
                Notes:
                </h4>
                <ul>
                  <li>
                  {med.notes}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}