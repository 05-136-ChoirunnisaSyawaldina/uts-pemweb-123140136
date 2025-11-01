// src/components/DataTable.jsx
import React from 'react';

function DataTable({ books, onAdd, onSelectDetail }) {
  return (
    <div className="data-table-container">
      <h2>Hasil Pencarian</h2>
      <table>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Tahun</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy row */}
          <tr>
            <td><div className="dummy-cover"></div></td>
            <td>Contoh Judul Buku</td>
            <td>Contoh Penulis</td>
            <td>2023</td>
            <td>
              <button onClick={() => onAdd({ key: 'dummy', title: 'Contoh' })}>Tambah</button>
              <button onClick={() => onSelectDetail('dummy')}>Detail</button>
            </td>
          </tr>
          {/* Real data will be mapped here */}
        </tbody>
      </table>
      {books.length === 0 && <p className="info-message">Tidak ada hasil ditemukan.</p>}
    </div>
  );
}

export default DataTable;