// src/components/DetailCard.jsx
import React from 'react';

function DetailCard({ bookKey }) {
  return (
    <div className="detail-card-container">
      <h2>Detail Buku</h2>
      {bookKey ? (
        <p>Detail buku untuk: {bookKey} akan muncul di sini.</p>
      ) : (
        <p className="info-message">Klik "Detail" pada buku di hasil pencarian.</p>
      )}
    </div>
  );
}

export default DetailCard;