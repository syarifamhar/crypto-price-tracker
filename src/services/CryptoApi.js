import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

export const getCryptoPrices = async () => {
  const response = await axios.get(BASE_URL, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 250,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};
