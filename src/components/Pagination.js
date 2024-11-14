import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ coinsPerPage, totalCoins, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalCoins / coinsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const handleNextPage = () => {
      if (currentPage < totalPages) paginate(currentPage + 1);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) paginate(currentPage - 1);
    };
  
    return (
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        >
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`pagination-number ${number === currentPage ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          &gt;
        </button>
      </div>
    );
  };
  
  export default Pagination;