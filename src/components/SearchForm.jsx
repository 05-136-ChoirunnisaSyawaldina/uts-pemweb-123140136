import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5'; // Ikon pencarian

const SearchForm = ({ onSearch }) => {
  // State untuk 5 input (sudah benar)
  const [query, setQuery] = useState('react programming');
  const [subject, setSubject] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [hasCover, setHasCover] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, subject, publishYear, hasCover, sortBy });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        
        <div className="search-form">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author..."
            required
          />
          <button type="submit" className="search-button">
            <IoSearch />
            Search
          </button>
        </div>

        <div className="form-grid">
          {/* Input 2: select */}
          <div className="input-group">
            <label htmlFor="subject-filter">Subject:</label>
            <select 
              id="subject-filter" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="javascript">JavaScript</option>
              <option value="programming">Programming</option>
              <option value="fiction">Fiction</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Input 3: number */}
          <div className="input-group">
            <label htmlFor="year-filter">Published After (Year):</label>
            <input
              type="number"
              id="year-filter"
              placeholder="e.g. 2020"
              min="1000"
              max="2025"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>

          {/* Input 5: radio */}
          <div className="input-group">
            <label>Sort By:</label>
            <div className="radio-group">
              <input 
                type="radio" id="sortRel" value="relevance" 
                checked={sortBy === 'relevance'} 
                onChange={(e) => setSortBy(e.target.value)} 
              />
              <label htmlFor="sortRel">Relevance</label>
              
              <input 
                type="radio" id="sortNew" value="new" 
                checked={sortBy === 'new'} 
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label htmlFor="sortNew">Newest</label>
            </div>
          </div>
          
          {/* Input 4: checkbox */}
          <div className="input-group">
            <label>Options:</label>
            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="hasCover" 
                checked={hasCover} 
                onChange={(e) => setHasCover(e.target.checked)}
              />
              <label htmlFor="hasCover">Only show results with cover art</label>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default SearchForm;