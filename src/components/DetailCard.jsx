import React, { useState, useEffect } from 'react';

const DetailCard = ({ bookKey, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookKey) return;

    setLoading(true);
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details.');
        }
        const data = await response.json();
        
        let description = "No description available.";
        if (typeof data.description === 'string') {
          description = data.description;
        } else if (data.description && typeof data.description.value === 'string') {
          description = data.description.value;
        }

        setDetails({
          title: data.title,
          coverId: data.covers ? data.covers[0] : null,
          subjects: data.subjects ? data.subjects.slice(0, 5).join(', ') : 'N/A',
          description: description
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookKey]);

  const coverUrl = details?.coverId
    ? `https://covers.openlibrary.org/b/id/${details.coverId}-L.jpg`
    : 'https://via.placeholder.com/200x300.png?text=No+Cover';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {loading && <div className="loading-spinner"></div>}

        {!loading && details && (
          <div className="modal-body">
            <img src={coverUrl} alt={`Cover ${details.title}`} className="modal-cover" />
            <div className="modal-details">
              <h2>{details.title}</h2>
              <p><strong>Subjects:</strong> {details.subjects}</p>
              
              <div className="modal-description">
                <strong>Description:</strong>
                <p>{details.description.substring(0, 500)}{details.description.length > 500 ? '...' : ''}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;