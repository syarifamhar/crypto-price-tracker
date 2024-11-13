import React from 'react';

const CryptoList = ({ coins, onClickCoin }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-gray-600">
        <span>#</span>
        <span>Coin</span>
        <span>Price</span>
        <span>24h Change</span>
        <span>Market Cap</span>
        <span>Volume</span>
      </div>
      {coins.map((coin, index) => (
        <div
          key={coin.id}
          className="grid grid-cols-6 gap-4 p-4 border-b cursor-pointer hover:bg-gray-100"
          onClick={() => onClickCoin(coin)}
        >
          <span>{index + 1}</span>
          <span className="flex items-center space-x-2">
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <span>{coin.name}</span>
          </span>
          <span>${coin.current_price.toFixed(2)}</span>
          <span className={coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-green-500'}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
          <span>${coin.market_cap.toLocaleString()}</span>
          <span>${coin.total_volume.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;
