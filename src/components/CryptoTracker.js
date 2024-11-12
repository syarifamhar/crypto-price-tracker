// src/components/CryptoTracker.js
import { useState, useEffect } from "react";
import { fetchCryptoData } from "../services/api";

const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const getCryptoData = async () => {
      const data = await fetchCryptoData();
      setCryptos(data);
    };

    getCryptoData();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Cryptocurrency Price Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cryptos.map((crypto) => (
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
        ))}
      </div>
    </div>
  );
};

export default CryptoTracker;
