import React, { useEffect, useState } from 'react';
import CryptoCard from './components/CryptoCard';
import Pagination from './components/Pagination';
import Filter from './components/Filter';
import { getCryptoPrices } from './services/CryptoApi';
import './styles/App.css';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(50);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await getCryptoPrices();
        setCoins(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    const results = coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(results);
  }, [searchTerm, coins]);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleCoinClick = coin => setSelectedCoin(coin);

  return (
    <div className="app">
      <h1>Cryptocurrency Price Tracker</h1>
      <input
        type="text"
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedCoin ? (
        <div className="coin-detail">
          <button onClick={() => setSelectedCoin(null)} className="back-button">Back</button>
          <img src={selectedCoin.image} alt={`${selectedCoin.name} logo`} />
          <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
          <p>Current Price: ${selectedCoin.current_price}</p>
          <p>Market Cap: ${selectedCoin.market_cap.toLocaleString()}</p>
          <p>24h Change: {selectedCoin.price_change_percentage_24h}%</p>
        </div>
      ) : (
        <div className="crypto-cards">
          {currentCoins.map(coin => (
            <CryptoCard key={coin.id} coin={coin} onClick={() => handleCoinClick(coin)} />
          ))}
        </div>
      )}
      <div class="pagination-container">
      {!selectedCoin && (
        
        <Pagination
          coinsPerPage={coinsPerPage}
          totalCoins={filteredCoins.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
      <Filter setCoinsPerPage={setCoinsPerPage} />
      </div>
    </div>
  );
};

export default App;
