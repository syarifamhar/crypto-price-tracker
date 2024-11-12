import { useState, useEffect } from "react";
import { fetchCryptoData } from "../services/api";
import debounce from "lodash.debounce";

const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        setError(null); // Clear previous errors
        const data = await fetchCryptoData();
        setCryptos(data);
        setFilteredCryptos(data); // Set filtered data to all coins initially
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch cryptocurrency data. Please try again later.");
      }
    };

    getCryptoData();
  }, []);

  // Debounced function to handle search term change
  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);

    if (value) {
      // Filter coins based on name containing the search term
      const filtered = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCryptos(filtered);
    } else {
      // Show all cryptos if search term is empty
      setFilteredCryptos(cryptos);
    }
  }, 300); // Wait 300ms after typing stops

  const handleSearchInput = (e) => {
    handleSearchChange(e.target.value);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCryptos.length > 0 ? (
          filteredCryptos.map((crypto) => (
            <div
              key={crypto.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold">{crypto.name}</h2>
              <p className="text-lg text-gray-500">{crypto.symbol.toUpperCase()}</p>
              <p className="text-2xl font-bold mt-2">${crypto.current_price.toFixed(2)}</p>
              <p className="text-sm mt-4 text-gray-400">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="text-sm mt-2 text-gray-400">24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No cryptocurrencies found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default CryptoTracker;
