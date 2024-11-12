import { useState, useEffect } from "react";
import { fetchCryptoData } from "../services/api";
import debounce from "lodash.debounce";

const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage, setCoinsPerPage] = useState(20); // Default to 20 coins per page

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        setError(null);
        const data = await fetchCryptoData();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch cryptocurrency data. Please try again later.");
      }
    };

    getCryptoData();
  }, []);

  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCryptos(filtered);
      setCurrentPage(1); // Reset to page 1 on new search
    } else {
      setFilteredCryptos(cryptos);
    }
  }, 300);

  const handleSearchInput = (e) => {
    handleSearchChange(e.target.value);
  };

  // Pagination Logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCryptos.slice(indexOfFirstCoin, indexOfLastCoin);

  const totalPages = Math.ceil(filteredCryptos.length / coinsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleCoinsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setCoinsPerPage(value);
    setCurrentPage(1); // Reset to page 1 when items per page changes
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Cryptocurrency Price Tracker</h1>
      
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder="Search for a cryptocurrency..."
        className="border border-gray-300 p-2 rounded w-full mb-4"
      />
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-4">
        <label htmlFor="coinsPerPage" className="text-gray-700">
          Show per page:
        </label>
        <select
          id="coinsPerPage"
          value={coinsPerPage}
          onChange={handleCoinsPerPageChange}
          className="ml-2 p-2 border rounded bg-gray-100 text-gray-700"
        >
          <option value="20">20 coins</option>
          <option value="50">50 coins</option>
          <option value="100">100 coins</option>
          <option value={filteredCryptos.length}>Show All</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCoins.map((crypto) => (
          <div key={crypto.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-xl font-semibold">{crypto.name}</h2>
            <p className="text-lg text-gray-500">{crypto.symbol.toUpperCase()}</p>
            <p className="text-2xl font-bold mt-2">${crypto.current_price.toFixed(2)}</p>
            <p className="text-sm mt-4 text-gray-400">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
            <p className="text-sm mt-2 text-gray-400">24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        
        <p className="text-gray-700">Page {currentPage} of {totalPages}</p>
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CryptoTracker;
