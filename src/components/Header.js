import React from 'react';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <h1>Crypto Tracker</h1>
      <SearchBar onSearch={onSearch} />
    </header>
  );
};

export default Header;