import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CryptoTracker.css"; // CSS for CryptoTracker

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50); // Default items per page
  const [totalCoins, setTotalCoins] = useState(0);

  useEffect(() => {
    fetchCoins();
  }, [currentPage, itemsPerPage]);

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: itemsPerPage,
            page: currentPage,
          },
        }
      );
      setCoins(response.data);
      setTotalCoins(12500); // Adjust dynamically if needed
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCoins / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when the filter changes
  };

  return (
    <div className="crypto-tracker-container">
      <h1 className="header">Cryptocurrency Tracker</h1>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id} class="hover:tw-bg-gray-50 tw-bg-white dark:tw-bg-moon-900 hover:dark:tw-bg-moon-800 tw-text-sm">
              <td class="tw-sticky 2lg:tw-static tw-left-[24px] tw-px-1 tw-py-2.5 2lg:tw-p-2.5 tw-bg-inherit tw-text-gray-900 dark:tw-text-moon-50">{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td class="tw-sticky 2lg:tw-static tw-left-[51px] md:tw-left-[72px] tw-px-1 tw-py-2.5 2lg:tw-p-2.5 tw-bg-inherit tw-text-gray-900 dark:tw-text-moon-50">
                <a class="tw-flex tw-items-center tw-w-full">
                  <img src={coin.image} alt={`${coin.name} logo`} class="coin-logo-table" /> 
                  <div class="tw-flex tw-flex-col 2lg:tw-flex-row tw-items-start 2lg:tw-items-center">
                    {coin.name} {coin.symbol}
                  </div>
                  
                </a>
                </td>
              <td class="tw-sticky 2lg:tw-static tw-left-[24px] tw-px-1 tw-py-2.5 2lg:tw-p-2.5 tw-bg-inherit tw-text-gray-900 dark:tw-text-moon-50">${coin.current_price}</td>
              <td class="tw-sticky 2lg:tw-static tw-left-[24px] tw-px-1 tw-py-2.5 2lg:tw-p-2.5 tw-bg-inherit tw-text-gray-900 dark:tw-text-moon-50">${coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        {/* Pagination */}
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="pagination-button"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {Math.ceil(totalCoins / itemsPerPage)}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="pagination-button"
            disabled={currentPage === Math.ceil(totalCoins / itemsPerPage)}
          >
            Next
          </button>
        </div>

        {/* Items per page */}
        <div className="filter-container">
          <span>Show:</span>
          {[50, 100, 300, totalCoins].map((count) => (
            <button
              key={count}
              onClick={() => handleItemsPerPageChange(count)}
              className={`filter-button ${
                itemsPerPage === count ? "active-filter" : ""
              }`}
            >
              {count === totalCoins ? "All" : count}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
