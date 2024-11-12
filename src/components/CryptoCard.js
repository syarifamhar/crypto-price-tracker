// src/components/CryptoCard.js
import React from 'react';

function CryptoCard({ coin }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-center">{coin.name}</h3>
      <p className="text-center text-gray-500">{coin.symbol}</p>
      <p className="text-center font-bold text-xl">${coin.current_price}</p>
      <img src={coin.image} alt={coin.name} className="mx-auto mt-4 w-16 h-16 object-contain" />
    </div>
  );
}

export default CryptoCard;
