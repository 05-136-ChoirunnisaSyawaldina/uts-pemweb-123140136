// src/components/DataTable.jsx
import React from 'react';

// (Kriteria: React - Props passing)
function DataTable({ books, onAdd, onSelectDetail }) {
  // (Kriteria: React - Conditional rendering)
  if (books.length === 0) {
    // Pesan jika tidak ada hasil setelah pencarian
    return <p className="info-message">Tidak ada buku yang ditemukan. Coba pencarian lain.</p>;
  }

  return (
    <div className="data-table-container">
      <h2>Hasil Pencarian</h2>
      {/* Tambahkan elemen untuk membuat tabel bisa di-scroll horizontal di HP (Responsive Design) */}
      <div className="table-wrapper"> 
        {/* (Kriteria: Table Implementation - dinamis dengan minimal 3 kolom) */}
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
            {/* INI BAGIAN PENTING: Iterasi melalui array 'books' yang diterima dari props */}
            {/* (Kriteria: Modern JavaScript - Array Methods: map) */}
            {books.map((book) => (
              <tr key={book.key}> {/* Key unik untuk setiap baris (penting untuk React) */}
                <td>
                  {/* Tampilkan cover jika ada (data dari API) */}
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
                  {/* Tombol Aksi yang akan memanggil fungsi dari App.jsx */}
                  {/* (Kriteria: React - Event handling) */}
                  <button onClick={() => onAdd(book)}>Tambah</button>
                  <button onClick={() => onSelectDetail(book.key)}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> {/* Akhir dari table-wrapper */}

    </div>
  );
}

export default DataTable;