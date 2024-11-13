import React from 'react';
import '../styles/CryptoCard.css';

const CryptoCard = ({ coin, onClick }) => {
  return (
    <div className="crypto-card" onClick={onClick}>
      <img src={coin.image} alt={`${coin.name} logo`} />
      <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
      <p>Price: ${coin.current_price}</p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CryptoCard;
