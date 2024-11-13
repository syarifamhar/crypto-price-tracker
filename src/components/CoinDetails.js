import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCryptoPrices } from '../services/CryptoApi';

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      const data = await getCryptoPrices();
      const selectedCoin = data.find((coin) => coin.id === id);
      setCoin(selectedCoin);
      setLoading(false);
    };
    fetchCoin();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="coin-detail">
      <Link to="/" className="back-button">Back</Link>
      <h2>{coin.name}</h2>
      <img src={coin.image} alt={coin.name} />
      <p>Symbol: {coin.symbol}</p>
      <p>Current Price: ${coin.current_price}</p>
      <p>Market Cap: ${coin.market_cap}</p>
      <p>24h Volume: ${coin.total_volume}</p>
      <p>High 24h: ${coin.high_24h}</p>
      <p>Low 24h: ${coin.low_24h}</p>
    </div>
  );
}

export default CoinDetail;
