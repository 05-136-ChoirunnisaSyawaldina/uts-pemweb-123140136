import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Pastikan axios sudah diimpor

// Impor semua komponen
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import ReadingList from './components/ReadingList';
import './App.css'; // Impor CSS utama

function App() {
  // State untuk menyimpan data aplikasi
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readingList, setReadingList] = useState([]); // State untuk daftar baca
  const [selectedBookKey, setSelectedBookKey] = useState(null); // State untuk detail buku

  // --- useEffect 1: Memuat data dari localStorage saat komponen pertama kali di-mount ---
  useEffect(() => {
    try {
      const savedList = localStorage.getItem('myReadingList');
      if (savedList) {
        setReadingList(JSON.parse(savedList));
      }
    } catch (e) {
      console.error("Failed to load reading list from localStorage", e);
      setReadingList([]); // Jika ada error (misal: data corrupt), mulai dengan array kosong
    }
  }, []); // Array kosong berarti hanya dijalankan sekali saat mount

  // --- useEffect 2: Menyimpan data ke localStorage setiap kali 'readingList' berubah ---
  useEffect(() => {
    if (readingList.length > 0) { // Hanya simpan jika ada isinya
      localStorage.setItem('myReadingList', JSON.stringify(readingList));
    } else {
      // Jika readingList kosong, hapus item dari localStorage juga
      localStorage.removeItem('myReadingList');
    }
  }, [readingList]); // Dependensi pada readingList: dijalankan setiap kali readingList berubah

  // --- Fungsi untuk pencarian buku dari Open Library API ---
  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setSearchResults([]); // Kosongkan hasil lama

    let searchUrl = `https://openlibrary.org/search.json?`;
    const encodedQuery = encodeURIComponent(query);

    if (type === 'title') {
      searchUrl += `q=${encodedQuery}`;
    } else {
      searchUrl += `author=${encodedQuery}`;
    }
    searchUrl += `&limit=20`; // Batasi hasil agar tidak terlalu banyak

    try {
      const response = await axios.get(searchUrl);
      
      const books = response.data.docs.map(doc => {
        const { key, title, author_name, first_publish_year, cover_i, subject } = doc;
        
        return {
          key: key,
          title: title,
          author: author_name ? author_name[0] : 'N/A', // Ambil penulis pertama
          year: first_publish_year,
          cover_id: cover_i,
          subjects: subject || [] // Pastikan subjects adalah array (penting untuk filter nanti)
        };
      });
      
      setSearchResults(books);

    } catch (err) {
      console.error("API Fetch Error:", err);
      setError('Gagal mengambil data dari Open Library. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  // --- Fungsi untuk menambah buku ke reading list ---
  const handleAddToList = (bookToAdd) => {
    if (!readingList.some(book => book.key === bookToAdd.key)) {
      setReadingList(prevList => [...prevList, bookToAdd]);
      alert(`${bookToAdd.title} ditambahkan ke Reading List!`);
    } else {
      alert(`${bookToAdd.title} sudah ada di Reading List.`);
    }
  };

  // --- Fungsi untuk menghapus buku dari reading list ---
  const handleRemoveFromList = (bookKeyToRemove) => {
    setReadingList(prevList => prevList.filter(book => book.key !== bookKeyToRemove));
    alert(`Buku dihapus dari Reading List.`);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="content-sections">
        {/* Section Search Form */}
        <section className="card search-section">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
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
              onAdd={handleAddToList} // Meneruskan fungsi penambah ke DataTable
              onSelectDetail={setSelectedBookKey} // Meneruskan fungsi set selected book
            />
          )}
        </section>

        {/* Section Detail Card */}
        <section className="card detail-section">
          <DetailCard bookKey={selectedBookKey} /> {/* Meneruskan key buku terpilih */}
        </section>

        {/* Section Reading List */}
        <section className="card reading-list-section">
          <ReadingList 
            list={readingList} // Meneruskan daftar baca
            onRemove={handleRemoveFromList} // Meneruskan fungsi penghapus
          />
        </section>
      </main>
    </div>
  );
}

export default App;