import React from 'react';

const CryptoCard = ({ crypto }) => {
  return (
    <div className="crypto-card border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <img src={crypto.image} alt={crypto.name} className="w-10 h-10" />
        <h2 className="text-xl font-semibold">{crypto.name}</h2>
      </div>
      <p className="text-lg mt-2">
        Current Price: ${crypto.current_price.toLocaleString()}
      </p>
      <p className="text-gray-600">
        24h Change: <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
    </div>
  );
};

export default CryptoCard;
