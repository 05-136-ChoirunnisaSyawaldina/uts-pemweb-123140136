// src/components/DetailCard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Impor axios

// (Kriteria: React - Functional components, Props passing)
function DetailCard({ bookKey }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // (Kriteria: React - useEffect, Modern JS - async/await, API Integration)
  // useEffect ini akan dijalankan SETIAP KALI 'bookKey' (prop) berubah
  useEffect(() => {
    // Jika tidak ada bookKey yang diberikan (misal: saat aplikasi pertama kali dimuat), reset detail
    if (!bookKey) {
      setDetails(null);
      setError(null);
      return; // Hentikan eksekusi further
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setDetails(null); // Reset detail sebelumnya

      try {
        // Panggil API detail buku menggunakan bookKey
        // bookKey akan seperti "/works/OL45883W"
        const response = await axios.get(`https://openlibrary.org${bookKey}.json`);
        
        // (Kriteria: Modern JS - Destructuring)
        const { description, subjects } = response.data;
        
        // Deskripsi dari API bisa berupa objek { type: '...', value: '...' } atau string
        const descText = typeof description === 'object' && description !== null 
                         ? description.value 
                         : description;
        
        setDetails({
          description: descText || 'Tidak ada deskripsi yang tersedia.',
          subjects: subjects && subjects.length > 0 ? subjects.slice(0, 5) : ['Tidak ada subjek.'] // Batasi subjek 5 saja
        });
        
      } catch (err) {
        console.error("Failed to fetch book details:", err);
        setError('Gagal memuat detail buku. Coba lagi.');
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails(); // Panggil fungsi fetchDetails
  }, [bookKey]); // <-- Dependency array: effect akan jalan jika bookKey berubah

  // (Kriteria: React - Conditional rendering)
  // src/components/DetailCard.jsx

// ... (semua kode di atas ini tetap sama) ...

  // (Kriteria: React - Conditional rendering)
  if (loading) {
    return (
      <div className="detail-card-container">
        <h2>Detail Buku</h2>
        <p>Memuat detail buku...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-card-container">
        <h2>Detail Buku</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }
  
  if (!details) {
     return (
       <div className="detail-card-container">
         <h2>Detail Buku</h2>
         <p className="info-message">Klik "Detail" pada buku di hasil pencarian untuk melihat informasi lengkap.</p>
       </div>
     );
  }

  // Jika details sudah ada, tampilkan
  return (
    <div className="detail-card-container">
      <h2>Detail Buku</h2>
      <p className="detail-description">{details.description}</p>
      
      {/* KOREKSI: Pastikan kondisi ini dibungkus dengan Fragment atau div jika ada lebih dari 1 elemen */}
      {details.subjects.length > 0 && ( // Ini adalah conditional rendering
        <> {/* Fragment untuk membungkus multiple elements secara kondisional */}
          <h4 className="detail-subjects-title">Subjek:</h4>
          <ul className="detail-subjects-list">
            {details.subjects.map((subject, index) => (
              <li key={index}>{subject}</li> // Menggunakan index sebagai key, aman karena list ini statis
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default DetailCard;