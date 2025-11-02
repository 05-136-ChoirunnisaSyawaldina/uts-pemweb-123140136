import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';

// Komponen Fungsional
function App() {
  // useState
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useState({
    query: 'react programming',
    subject: '',
    publishYear: '',
    hasCover: false,
    sortBy: 'relevance'
  });
  
  const [selectedBookKey, setSelectedBookKey] = useState(null);

  // useEffect
  useEffect(() => {
    // Async Await
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]);
      
      try {
        // Template Literals
        let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchParams.query)}`;
        
        if (searchParams.subject) {
          url += `&subject=${encodeURIComponent(searchParams.subject)}`;
        }
        if (searchParams.publishYear) {
          url += `&first_publish_year=${encodeURIComponent(searchParams.publishYear)}`;
        }
        if (searchParams.sortBy === 'new') {
          url += `&sort=new`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari Open Library API.');
        }
        const data = await response.json();
        
        // Data Transformation
        // Array Methods (.map, .filter)
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
    
  }, [searchParams]); // Dependency array

  // Event Handling
  const handleSearch = (newParams) => {
    setSearchParams(newParams);
  };

  const handleBookClick = (bookKey) => {
    setSelectedBookKey(bookKey);
  };

  const handleCloseModal = () => {
    setSelectedBookKey(null);
  };

  // Logika localStorage
  const handleAddToList = (book) => {
    try {
      const list = JSON.parse(localStorage.getItem('readingList') || '[]');
      // Array Methods (.find)
      if (!list.find(item => item.key === book.key)) {
        list.push(book);
        localStorage.setItem('readingList', JSON.stringify(list));
        alert(`${book.title} berhasil ditambahkan ke Reading List!`);
      } else {
        alert(`${book.title} sudah ada di Reading List.`);
      }
    } catch (e) {
      console.error("Gagal menyimpan ke localStorage", e);
      alert("Gagal menyimpan ke Reading List.");
    }
  };

  return (
    <div className="container">
      {/* Props Passing */}
      <Header title="My Pastel Book Library" />
      
      <SearchForm 
        onSearch={handleSearch} 
      />
      
      <DataTable
        books={books}
        loading={loading}
        error={error}
        onBookClick={handleBookClick}
        onAddToList={handleAddToList}
      />

      {/* Conditional Rendering */}
      {selectedBookKey && (
        <DetailCard 
          bookKey={selectedBookKey} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default App;