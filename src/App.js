import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoCard from './components/CryptoCard';
import './styles/App.css';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(8);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 250,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };
    fetchCoins();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleCoinsPerPageChange = (e) => {
    const selectedValue = e.target.value;
    setCoinsPerPage(selectedValue === 'all' ? coins.length : Number(selectedValue));
    setCurrentPage(1);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm) ||
    coin.symbol.toLowerCase().includes(searchTerm)
  );

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="App">
      <h1>Cryptocurrency Price Tracker</h1>
      <input
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="crypto-grid">
        {currentCoins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          &larr; Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={currentPage === page + 1 ? 'active' : ''}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next &rarr;
        </button>

        <select onChange={handleCoinsPerPageChange} value={coinsPerPage === coins.length ? 'all' : coinsPerPage} className="pagination-filter">
          <option value="20">Show 20 coins</option>
          <option value="50">Show 50 coins</option>
          <option value="100">Show 100 coins</option>
          <option value="all">Show All</option>
        </select>
      </div>
    </div>
  );
};

export default App;
