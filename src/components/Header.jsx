import React from 'react';
import { IoBookmarks } from 'react-icons/io5'; // Ikon baru

// Komponen sekarang menerima prop 'onToggleList'
const Header = ({ title, onToggleList }) => {
  return (
    <header className="app-header">
      <h1>{title}</h1>
      <button className="my-list-button" onClick={onToggleList}>
        <IoBookmarks />
        My List
      </button>
    </header>
  );
};

export default Header;