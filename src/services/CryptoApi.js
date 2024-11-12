// CryptoApi.js

import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (page = 1, per_page = 20) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: per_page,
        page: page,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return [];
  }
};
