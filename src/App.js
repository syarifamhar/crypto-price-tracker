import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CryptoCard from './components/CryptoCard';
import { getCryptoPrices, searchCrypto } from './services/CryptoApi';
import './styles/App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [perPage, setPerPage] = useState(20); // Coins per page
  const [totalResults, setTotalResults] = useState(0); // Total number of coins
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data on mount and when page, perPage, or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (searchTerm) {
          data = await searchCrypto(searchTerm, page, perPage); // Search data
        } else {
          data = await getCryptoPrices(page, perPage); // General data
        }

        setCryptoData(data.coins || data); // For search or general data
        setTotalResults(data.total || data.length); // Set total for pagination
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, perPage, searchTerm]);

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on search
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalResults / perPage);

  // Page numbers to show in pagination (1, 2, 3, 4...)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />

      {/* Crypto Cards */}
      <div className="crypto-container container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto py-8 px-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : cryptoData.length > 0 ? (
          cryptoData.map(coin => (
            <CryptoCard key={coin.id} coin={coin} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mx-auto py-4 px-4 max-w-4xl">
        {/* Previous Button */}
        <button
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          disabled={page <= 1}
        >
          &larr; Prev
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 rounded-md ${
                page === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setPage(prevPage => Math.min(prevPage + 1, totalPages))}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          disabled={page >= totalPages}
        >
          Next &rarr;
        </button>
      </div>

      {/* Pagination Filter (20, 50, 100, Show All) */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPerPage(20)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          20 coins
        </button>
        <button
          onClick={() => setPerPage(50)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          50 coins
        </button>
        <button
          onClick={() => setPerPage(100)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          100 coins
        </button>
        <button
          onClick={() => setPerPage(totalResults)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Show All
        </button>
      </div>
    </div>
  );
}

export default App;
