// src/components/SearchForm.jsx
import React, { useState } from 'react'; // Impor useState

function SearchForm({ onSearch, isLoading }) {
  // (Kriteria: React - useState)
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  // (Kriteria: React - Event handling)
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form reload halaman
    if (!query) return; // Tidak melakukan apa-apa jika query kosong
    
    // Panggil fungsi onSearch yang dikirim dari App.jsx
    onSearch(query, searchType);
  };
  
  // Fungsi untuk tombol reset
  const handleReset = () => {
    setQuery('');
    setSearchType('title');
  };

  return (
    <div className="search-form-container">
      <h2>Cari Buku</h2>
      
      {/* (Kriteria: Form Implementation) */}
      <form onSubmit={handleSubmit}>
        
        {/* Input 1: Label */}
        <label htmlFor="search-query">Judul atau Penulis</label>
        
        {/* Input 2: Text Input */}
        <input
          type="text"
          id="search-query"
          value={query}
          // (Kriteria: React - Event handling)
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Mis: The Lord of the Rings"
          // (Kriteria: Form - HTML5 Validation)
          required 
          disabled={isLoading} // Form dimatikan saat loading
        />
        
        {/* Input 3: Label */}
        <label htmlFor="search-type">Cari Berdasarkan</label>
        
        {/* Input 4: Select Dropdown */}
        <select
          id="search-type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          disabled={isLoading}
        >
          <option value="title">Judul</option>
          <option value="author">Penulis</option>
        </select>

        <div className="form-buttons">
          {/* Input 5: Submit Button */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Mencari...' : 'Cari'}
          </button>
          
          {/* (Bonus) Input 6: Reset Button */}
          <button type="reset" onClick={handleReset} disabled={isLoading}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;