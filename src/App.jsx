// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import ReadingList from './components/ReadingList';
import './App.css'; // File CSS utama kita

function App() {
  // Kita akan menambahkan state di langkah berikutnya
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [selectedBookKey, setSelectedBookKey] = useState(null);

  // --- TEMPAT FUNGSI handleSearch, handleAddToList, handleRemoveFromList, dll. ---
  // Ini akan kita isi di langkah-langkah selanjutnya.
  // Untuk sementara, kita buat dummy function agar tidak error
  const handleSearch = (query, type) => { console.log("Search:", query, type); };
  const handleAddToList = (book) => { console.log("Add:", book); };
  const handleRemoveFromList = (key) => { console.log("Remove:", key); };

  return (
    <div className="app-container">
      <Header />

      <main className="content-sections">
        {/* Section Search Form */}
        <section className="card search-section">
          <SearchForm onSearch={handleSearch} />
        </section>

        {/* Section Data Table */}
        <section className="card data-table-section">
          {loading && <p>Mencari buku...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && searchResults.length === 0 && (
            <p className="info-message">Mulai cari buku favorit Anda!</p>
          )}
          {!loading && !error && searchResults.length > 0 && (
            <DataTable 
              books={searchResults} 
              onAdd={handleAddToList}
              onSelectDetail={setSelectedBookKey}
            />
          )}
        </section>

        {/* Section Detail Card */}
        <section className="card detail-section">
          <DetailCard bookKey={selectedBookKey} />
        </section>

        {/* Section Reading List */}
        <section className="card reading-list-section">
          <ReadingList 
            list={readingList} 
            onRemove={handleRemoveFromList}
          />
        </section>
      </main>

      {/* Kita bisa tambahkan Footer di sini jika diperlukan */}
    </div>
  );
}

export default App;