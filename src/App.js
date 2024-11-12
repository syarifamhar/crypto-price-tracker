// App.js
import React, { useState, useEffect } from 'react';
import { getCryptoPrices } from './services/CryptoApi';
import CryptoCard from './components/CryptoCard';
import './styles/App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [page, itemsPerPage, searchTerm]);

  const fetchData = async () => {
    const data = await getCryptoPrices();
    const filteredData = searchTerm
      ? data.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : data;
    setCryptoData(filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPage(1);
  };

  return (
    <div className="App">
      <h1>Crypto Price Tracker</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="crypto-container">
        {cryptoData.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={page === 1}>← Prev</button>
        <span>{page}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next →</button>
      </div>
      <div className="items-per-page">
        <button onClick={() => handleItemsPerPageChange(20)}>20 coins</button>
        <button onClick={() => handleItemsPerPageChange(50)}>50 coins</button>
        <button onClick={() => handleItemsPerPageChange(100)}>100 coins</button>
        <button onClick={() => handleItemsPerPageChange(totalPages * itemsPerPage)}>Show All</button>
      </div>
    </div>
  );
}

export default App;
