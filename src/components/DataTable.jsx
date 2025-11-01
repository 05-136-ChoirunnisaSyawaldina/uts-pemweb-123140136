import React from 'react';

function DataTable({ books, onAdd, onSelectDetail }) {
  if (books.length === 0) {
    return <p className="info-message">Tidak ada buku yang ditemukan. Coba pencarian lain.</p>;
  }

  return (
    <div className="data-table-container">
      <h2>Hasil Pencarian</h2>
      <div className="table-wrapper"> 
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Judul</th>
              <th>Penulis</th>
              <th>Tahun Terbit</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.key}>
                <td>
                  {book.cover_id ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_id}-S.jpg`}
                      alt={`Cover ${book.title}`}
                      className="book-cover-thumb"
                    />
                  ) : (
                    <div className="no-cover-thumb">No Cover</div>
                  )}
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>
                  <button onClick={() => onAdd(book)}>Tambah</button> {/* Memanggil fungsi onAdd */}
                  <button onClick={() => onSelectDetail(book.key)}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;