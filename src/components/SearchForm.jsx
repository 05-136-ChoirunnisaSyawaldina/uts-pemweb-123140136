import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  // State untuk 5 input berbeda
  const [query, setQuery] = useState('react programming'); // Input 1: text
  const [subject, setSubject] = useState(''); // Input 2: select
  const [publishYear, setPublishYear] = useState(''); // Input 3: number
  const [hasCover, setHasCover] = useState(false); // Input 4: checkbox
  const [sortBy, setSortBy] = useState('relevance'); // Input 5: radio

  // Form submission handling
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, subject, publishYear, hasCover, sortBy });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        
        {/* Input 1: text */}
        <div className="search-form">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berdasarkan judul atau penulis..."
            required // Validasi HTML5
          />
          <button type="submit">Cari</button>
        </div>

        <div className="form-grid">
          {/* Input 2: select */}
          <div className="input-group">
            <label htmlFor="subject-filter">Subjek:</label>
            <select 
              id="subject-filter" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Semua Subjek</option>
              <option value="javascript">JavaScript</option>
              <option value="programming">Programming</option>
              <option value="fiction">Fiction</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Input 3: number */}
          <div className="input-group">
            <label htmlFor="year-filter">Tahun Terbit (Setelah):</label>
            <input
              type="number"
              id="year-filter"
              placeholder="Contoh: 2020"
              min="1000"
              max="2025" // Validasi HTML5
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>

          {/* Input 5: radio */}
          <div className="input-group">
            <label>Urutkan Berdasarkan:</label>
            <div className="radio-group">
              <input 
                type="radio" id="sortRel" value="relevance" 
                checked={sortBy === 'relevance'} 
                onChange={(e) => setSortBy(e.target.value)} 
              />
              <label htmlFor="sortRel">Relevansi</label>
              
              <input 
                type="radio" id="sortNew" value="new" 
                checked={sortBy === 'new'} 
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label htmlFor="sortNew">Terbaru</label>
            </div>
          </div>
          
          {/* Input 4: checkbox */}
          <div className="input-group">
            <label>Opsi Tambahan:</label>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="hasCover" 
                checked={hasCover} 
                onChange={(e) => setHasCover(e.target.checked)}
              />
              <label htmlFor="hasCover">Hanya tampilkan yang memiliki cover</label>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;