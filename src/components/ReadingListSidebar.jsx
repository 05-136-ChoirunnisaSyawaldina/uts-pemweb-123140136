import React from 'react';
// Impor ikon
import { IoClose, IoTrashBin } from 'react-icons/io5';

const ReadingListSidebar = ({ isOpen, listItems, onRemove, onClose }) => {
  const overlayClasses = isOpen ? 'sidebar-overlay open' : 'sidebar-overlay';
  const sidebarClasses = isOpen ? 'sidebar open' : 'sidebar';

  return (
    <div className={overlayClasses} onClick={onClose}>
      <div className={sidebarClasses} onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h2>My Reading List</h2>
          <button className="sidebar-close-btn" onClick={onClose}>
            <IoClose />
          </button>
        </div>
        
        <div className="sidebar-content">
          {listItems.length === 0 ? (
            <div className="empty-list-message">
              <p>Your reading list is empty.</p>
              <p>Add books from the main page!</p>
            </div>
          ) : (
            listItems.map(book => (
              <div key={book.key} className="list-item">
                <img
                  src={book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg` : 'https://via.placeholder.com/60x90.png?text=N/A'}
                  alt={book.title}
                  className="list-item-cover"
                />
                <div className="list-item-info">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                </div>
                <button 
                  className="list-item-remove-btn"
                  onClick={() => onRemove(book.key)}
                  title="Remove from list"
                >
                  <IoTrashBin />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingListSidebar;