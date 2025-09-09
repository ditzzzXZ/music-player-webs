'use client';

import { useState } from 'react';
import Genius from 'genius-lyrics';

export default function Search() {
  const [query, setQuery] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setLyrics('');
    try {
      // Ganti YOUR_GENIUS_ACCESS_TOKEN jika punya, kosongkan kalau ga punya
      const client = new Genius.Client(process.env.NEXT_PUBLIC_GENIUS_ACCESS_TOKEN || '');
      const searches = await client.songs.search(query);
      const firstSong = searches[0];
      if (firstSong) {
        const lyricsText = await firstSong.lyrics();
        setLyrics(lyricsText || 'Lirik tidak ditemukan 😔');
      } else {
        setLyrics('Lagu tidak ditemukan 😔');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Cari Lirik Lagu 🎤</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-lg bg-blue-800 text-white w-64 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          placeholder="Judul lagu atau artis..."
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="ml-2 p-2 bg-cyan-300 text-blue-900 rounded-lg hover:bg-cyan-400 transition disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Cari'}
        </button>
      </div>
      {error && <p className="text-red-300 mb-4">{error}</p>}
      {lyrics && (
        <pre className="mt-4 p-4 bg-blue-800/50 rounded-xl whitespace-pre-wrap max-h-96 overflow-y-auto">
          {lyrics}
        </pre>
      )}
    </div>
  );
}
