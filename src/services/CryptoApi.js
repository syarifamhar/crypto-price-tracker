import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (page, perPage) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage, // Using dynamic perPage value
        page: page, // Using dynamic page value
        sparkline: false,
      },
    });
    return { coins: response.data, total: response.headers['x-total-count'] }; // Ensure total count is fetched
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return { coins: [], total: 0 };
  }
};

export const searchCrypto = async (searchTerm, page, perPage) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: searchTerm, // Searching by coin ID
        order: 'market_cap_desc',
        per_page: perPage, // Using dynamic perPage value
        page: page, // Using dynamic page value
        sparkline: false,
      },
    });
    return { coins: response.data, total: response.headers['x-total-count'] }; // Ensure total count is fetched
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return { coins: [], total: 0 };
  }
};
