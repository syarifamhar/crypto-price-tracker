import React from 'react';

const CoinDetails = ({ coin, onBack }) => (
  <div className="bg-white shadow rounded p-4">
    <button onClick={onBack} className="text-blue-500 underline mb-4">
      &larr; Back to List
    </button>
    <h2 className="text-2xl font-bold mb-2">{coin.name} Details</h2>
    <p>Symbol: {coin.symbol.toUpperCase()}</p>
    <p>Current Price: ${coin.current_price.toLocaleString()}</p>
    <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    <p>Total Volume: ${coin.total_volume.toLocaleString()}</p>
    {/* Add additional details if needed */}
  </div>
);

export default CoinDetails;
