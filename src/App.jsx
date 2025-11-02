import React, { useState, useEffect } from 'react';
import './App.css';

// Impor semua komponen, termasuk yang baru
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import ReadingListSidebar from './components/ReadingListSidebar'; // Komponen baru

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useState({
    query: 'harry potter', // Ganti default search
    subject: '',
    publishYear: '1000', // Ganti default year
    hasCover: false,
    sortBy: 'relevance'
  });
  
  const [selectedBookKey, setSelectedBookKey] = useState(null);
  
  // --- STATE BARU UNTUK READING LIST ---
  const [readingList, setReadingList] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);

  // Efek 1: Fetch buku berdasarkan pencarian
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]);
      
      try {
        let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchParams.query)}`;
        if (searchParams.subject) url += `&subject=${encodeURIComponent(searchParams.subject)}`;
        if (searchParams.publishYear) url += `&first_publish_year=${encodeURIComponent(searchParams.publishYear)}`;
        if (searchParams.sortBy === 'new') url += `&sort=new`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data from Open Library API.');
        
        const data = await response.json();
        
        let formattedBooks = data.docs.map(doc => ({
          key: doc.key,
          title: doc.title,
          author: doc.author_name ? doc.author_name.join(', ') : 'N/A',
          year: doc.first_publish_year,
          coverId: doc.cover_i,
        }));

        if (searchParams.hasCover) {
          formattedBooks = formattedBooks.filter(book => book.coverId);
        }
        
        setBooks(formattedBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, [searchParams]);

  // Efek 2: Muat reading list dari localStorage saat app dibuka
  useEffect(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem('readingList') || '[]');
      setReadingList(storedList);
    } catch (e) {
      console.error("Failed to load reading list from localStorage", e);
      setReadingList([]);
    }
  }, []); // <-- Dependency kosong, hanya jalan sekali

  // --- FUNGSI BARU UNTUK LIST ---
  
  const handleAddToList = (bookToAdd) => {
    // Cek duplikat di state
    if (!readingList.find(item => item.key === bookToAdd.key)) {
      const newList = [...readingList, bookToAdd];
      setReadingList(newList);
      localStorage.setItem('readingList', JSON.stringify(newList)); // Simpan ke localStorage
    }
  };

  const handleRemoveFromList = (bookKeyToRemove) => {
    const newList = readingList.filter(item => item.key !== bookKeyToRemove);
    setReadingList(newList);
    localStorage.setItem('readingList', JSON.stringify(newList)); // Simpan ke localStorage
  };

  const toggleListSidebar = () => {
    setIsListOpen(!isListOpen);
  };

  // --- Handlers Lama ---
  const handleSearch = (newParams) => {
    setSearchParams(newParams);
  };
  const handleBookClick = (bookKey) => {
    setSelectedBookKey(bookKey);
  };
  const handleCloseModal = () => {
    setSelectedBookKey(null);
  };

  return (
    <div className="container">
      {/* Ganti title dan tambahkan prop onToggleList */}
      <Header 
        title="Book Library" 
        onToggleList={toggleListSidebar}
      />
      
      <SearchForm 
        onSearch={handleSearch} 
      />
      
      <DataTable
        books={books}
        loading={loading}
        error={error}
        onBookClick={handleBookClick}
        onAddToList={handleAddToList}
        readingList={readingList} // Kirim list untuk cek duplikat
      />

      {/* Modal Detail (Fitur Wajib) */}
      {selectedBookKey && (
        <DetailCard 
          bookKey={selectedBookKey} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Sidebar Reading List (Fitur Wajib) */}
      <ReadingListSidebar
        isOpen={isListOpen}
        listItems={readingList}
        onRemove={handleRemoveFromList}
        onClose={toggleListSidebar}
      />
      {/* === FOOTER BARU ANDA MULAI DI SINI === */}
      <footer className="app-footer">
        <p>© 2025 - Choirunnisa Syawaldina 123140136 | UTS PAW RA</p>
      </footer>
      {/* === FOOTER SELESAI === */}
    </div>
  );
}

export default App;