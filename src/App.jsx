// src/App.jsx

// Tambahkan import axios di paling atas
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import ReadingList from './components/ReadingList';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [selectedBookKey, setSelectedBookKey] = useState(null);

  // GANTI FUNGSI DUMMY 'handleSearch' DENGAN YANG INI:
  // (Kriteria: Modern JS - async/await, API Integration)
  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setSearchResults([]); // Kosongkan hasil lama

    // (Kriteria: Modern JS - Template Literals)
    let searchUrl = `https://openlibrary.org/search.json?`;
    const encodedQuery = encodeURIComponent(query); // Menangani spasi, dll.

    if (type === 'title') {
      searchUrl += `q=${encodedQuery}`;
    } else {
      searchUrl += `author=${encodedQuery}`;
    }
    searchUrl += `&limit=20`; // Batasi hasil agar tidak terlalu banyak

    try {
      const response = await axios.get(searchUrl);

      // (Kriteria: API Integration - Data Transformation)
      // (Kriteria: Modern JS - Array Methods, Destructuring)
      const books = response.data.docs.map(doc => {
        // (Kriteria: Modern JS - Destructuring)
        const { key, title, author_name, first_publish_year, cover_i, subject } = doc;
        
        return {
          key: key,
          title: title,
          author: author_name ? author_name[0] : 'N/A', // Ambil penulis pertama
          year: first_publish_year,
          cover_id: cover_i,
          subjects: subject || [] // Pastikan subjects adalah array
        };
      });
      
      setSearchResults(books);

    } catch (err) {
      console.error("API Fetch Error:", err);
      setError('Gagal mengambil data dari Open Library. Coba lagi nanti.');
    } finally {
      // (Kriteria: API Integration - Loading State)
      setLoading(false);
    }
  };

  // --- Fungsi dummy lainnya (handleAddToList, dll.) biarkan dulu ---
  const handleAddToList = (book) => { console.log("Add:", book); };
  const handleRemoveFromList = (key) => { console.log("Remove:", key); };
  
  return (
    <div className="app-container">
      <Header />
      
      <main className="content-sections">
        {/* Section Search Form */}
        <section className="card search-section">
          {/* Kirim 'isLoading' sebagai prop */}
          <SearchForm onSearch={handleSearch} isLoading={loading} />
        </section>

        {/* Section Data Table (Kriteria: React - Conditional Rendering) */}
        <section className="card data-table-section">
          {loading && <p>Mencari buku...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {/* Logika tampilan tabel akan kita perbaiki di langkah berikutnya */}
          {/* Untuk sekarang, kita ganti logikanya agar lebih akurat */}
          {!loading && !error && searchResults.length === 0 && (
            <p className="info-message">Mulai cari buku favorit Anda!</p>
          )}
          
          {/* Ini akan menampilkan dummy table jika ada hasil */}
          {!loading && !error && searchResults.length > 0 && (
            <DataTable 
              books={searchResults} // Kirim data asli
              onAdd={handleAddToList}
              onSelectDetail={setSelectedBookKey}
            />
          )}
        </section>

        {/* ... sisa komponen ... */}
        <section className="card detail-section">
          <DetailCard bookKey={selectedBookKey} />
        </section>
        <section className="card reading-list-section">
          <ReadingList 
            list={readingList} 
            onRemove={handleRemoveFromList}
          />
        </section>
      </main>
    </div>
  );
}

export default App;