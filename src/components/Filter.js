import React from 'react';
import '../styles/Filter.css';

const Filter = ({ setCoinsPerPage }) => {
  return (
    <div className="filter">
      <label htmlFor="coinsPerPage">Show:</label>
      <select
        id="coinsPerPage"
        onChange={(e) => setCoinsPerPage(Number(e.target.value))}
      >
        <option value="10">10 Coins</option>
        <option value="25">25 Coins</option>
        <option value="50">50 Coins</option>
        <option value="100">100 Coins</option>
        <option value="all">Show All</option>
      </select>
    </div>
  );
};

export default Filter;
