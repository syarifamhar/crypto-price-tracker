import React from "react";
import "../styles/CryptoCard.css";

function CryptoCard({ coin, onClick }) {
  return (
    <div className="crypto-card" onClick={onClick}>
      <img src={coin.image} alt={coin.name} />
      <h3>{coin.name}</h3>
      <p>{coin.symbol}</p>
      <p>${coin.current_price}</p>
    </div>
  );
}

export default CryptoCard;
