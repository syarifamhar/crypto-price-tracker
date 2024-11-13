import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 250,
            page: 1,
            sparkline: false,
          },
        });
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchCoins();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  // Reset to the first page on new search
  };

  const handleCoinsPerPageChange = (number) => {
    setCoinsPerPage(number);
    setCurrentPage(1);  // Reset to the first page
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="app">
      <h1 className="title">Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="coins-container">
        {currentCoins.map(coin => (
          <div key={coin.id} className="coin-card">
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <h2 className="coin-name">{coin.name}</h2>
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-price">${coin.current_price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt; Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next &gt;
        </button>
      </div>
      <div className="coins-per-page">
        <button onClick={() => handleCoinsPerPageChange(20)}>20 coins</button>
        <button onClick={() => handleCoinsPerPageChange(50)}>50 coins</button>
        <button onClick={() => handleCoinsPerPageChange(100)}>100 coins</button>
        <button onClick={() => handleCoinsPerPageChange(filteredCoins.length)}>Show All</button>
      </div>
    </div>
  );
};

export default App;
