import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CryptoCard from './components/CryptoCard';
import './styles/App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    // Fetch initial data for popular cryptocurrencies on mount
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(response => response.json())
      .then(data => setCryptoData(data));
  }, []);

  const handleSearch = (searchTerm) => {
    // Fetch data for a specific cryptocurrency based on search
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.length > 0 ? data : []); // Default to an empty array if no results
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const displayData = searchResults?.length > 0 ? searchResults : cryptoData;

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <div className="crypto-container container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto py-8 px-4">
        {displayData.length > 0 ? (
          displayData.map(coin => (
            <CryptoCard key={coin.id} coin={coin} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default App;
