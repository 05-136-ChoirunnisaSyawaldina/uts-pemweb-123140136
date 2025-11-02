import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

// Impor semua komponen
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DataTable from './components/DataTable';
import DetailCard from './components/DetailCard';
import ReadingList from './components/ReadingList';
import './App.css'; 

function App() {
  // State untuk menyimpan data aplikasi
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readingList, setReadingList] = useState([]); 
  const [selectedBookKey, setSelectedBookKey] = useState(null); 
  const [subjectFilter, setSubjectFilter] = useState(''); // <-- STATE BARU UNTUK FILTER SUBJEK

  // --- useEffect 1: Memuat data dari localStorage saat komponen pertama kali di-mount ---
  useEffect(() => {
    try {
      const savedList = localStorage.getItem('myReadingList');
      if (savedList) {
        setReadingList(JSON.parse(savedList));
      }
    } catch (e) {
      console.error("Failed to load reading list from localStorage", e);
      setReadingList([]); 
    }
  }, []); 

  // --- useEffect 2: Menyimpan data ke localStorage setiap kali 'readingList' berubah ---
  useEffect(() => {
    if (readingList.length > 0) { 
      localStorage.setItem('myReadingList', JSON.stringify(readingList));
    } else {
      localStorage.removeItem('myReadingList');
    }
  }, [readingList]); 

  // --- Fungsi untuk pencarian buku dari Open Library API ---
  // --- Fungsi untuk pencarian buku dari Open Library API ---
  const handleSearch = async (query, type) => {
    setLoading(true);
    setError(null);
    setSearchResults([]); 
    setSubjectFilter(''); 

    // Daftar fields yang kita inginkan dari API
    const fields = "key,title,author_name,first_publish_year,cover_i,subject,subject_facet,language";

    let searchUrl = `https://openlibrary.org/search.json?`;
    const encodedQuery = encodeURIComponent(query);

    if (type === 'title') {
      searchUrl += `q=${encodedQuery}`;
    } else {
      searchUrl += `author=${encodedQuery}`;
    }
    
    // --- PERUBAHAN DI SINI ---
    // Hapus baris lama: searchUrl += `&limit=20`; 
    // Ganti dengan baris ini:
    searchUrl += `&fields=${fields}&limit=20`;
    // -------------------------

    try {
      const response = await axios.get(searchUrl);
      
      const books = response.data.docs.map(doc => {
        // Sekarang 'doc' PASTI akan berisi 'subject_facet' jika ada
        const { key, title, author_name, first_publish_year, cover_i, subject, subject_facet, language } = doc;
        
        return {
          key: key,
          title: title,
          author: author_name ? author_name[0] : 'N/A', 
          year: first_publish_year,
          cover_id: cover_i,
          // Pastikan Anda juga menggunakan 'subject_facet' di sini
          subjects: subject_facet || subject || [], 
          language: language ? language[0] : 'N/A'
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

  // --- LOGIKA FILTER: Dapatkan daftar semua subjek unik dari searchResults ---
  const allSubjects = new Set();
  searchResults.forEach(book => {
    if (book.subjects && Array.isArray(book.subjects)) { 
      book.subjects.forEach(sub => {
        if (sub && typeof sub === 'string') { 
          allSubjects.add(sub);
        }
      });
    }
  });
  const uniqueSubjects = [...allSubjects].sort(); 
  console.log("Search Results:", searchResults);
  console.log("Unique Subjects:", uniqueSubjects);

  // --- LOGIKA FILTER: Filter searchResults berdasarkan subjectFilter ---
  const filteredResults = searchResults.filter(book => {
    if (!subjectFilter) {
      return true; // Jika tidak ada filter yang dipilih, tampilkan semua
    }
    return book.subjects && book.subjects.includes(subjectFilter);
  });

  return (
    <div className="app-container">
      <Header />
      
      <main className="content-sections">
        {/* Section Search Form */}
        <section className="card search-section">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
        </section>

        {/* Section Data Table (dengan Filter) */}
        <section className="card data-table-section">
          {loading && <p>Mencari buku...</p>}
          {error && <p className="error-message">{error}</p>}
          
          {!loading && !error && searchResults.length === 0 && (
            <p className="info-message">Mulai cari buku favorit Anda!</p>
          )}
          
          {!loading && !error && searchResults.length > 0 && (
            <> {/* Fragment untuk menampung elemen filter dan DataTable */}
              {/* --- DROPDOWN FILTER SUBJEK --- */}
              <div className="subject-filter-container">
                <label htmlFor="subject-filter">Filter Berdasarkan Subjek:</label>
                <select 
                  id="subject-filter"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option value="">Semua Subjek</option> 
                  {uniqueSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* DataTable sekarang menerima data yang sudah difilter */}
              <DataTable 
                books={filteredResults} // Menggunakan data yang sudah difilter
                onAdd={handleAddToList}
                onSelectDetail={setSelectedBookKey}
              />
            </>
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
    </div>
  );
}

export default App;