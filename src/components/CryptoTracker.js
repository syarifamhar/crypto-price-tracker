import React, { useEffect, useState } from 'react';
import { getCryptoPrices } from '../services/CryptoApi';
import CryptoCard from './CryptoCard';

const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptoPrices();
      setCryptos(data);
    };
    fetchData();
  }, []);

  return (
    <div className="crypto-tracker container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">Crypto Price Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
};

export default CryptoTracker;
