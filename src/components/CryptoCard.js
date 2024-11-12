import React from 'react';
import '../styles/CryptoCard.css';

const CryptoCard = ({ coin }) => {
  if (!coin) {
    return null; // Return null if coin data is not available
  }

  return (
    <div className="crypto-card">
      <img src={coin.image || ''} alt={coin.name || 'Crypto Image'} className="crypto-image" />
      <h2>{coin.name || 'Unknown Coin'}</h2>
      <p>Symbol: {coin.symbol?.toUpperCase() || 'N/A'}</p>
      <p>Price: ${coin.current_price?.toLocaleString() || 'N/A'}</p>
      <p>Market Cap: ${coin.market_cap?.toLocaleString() || 'N/A'}</p>
    </div>
  );
};

export default CryptoCard;
