'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSongs } from '../../lib/getSongs';

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSongs() {
      const songList = await getSongs();
      setSongs(songList);
      setLoading(false);
    }
    fetchSongs();
  }, []);

  if (loading) return <div className="text-center">Loading your vibes...</div>;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Your Vibe Playlist 😎</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <motion.div
            key={song.id}
            className="p-4 bg-blue-800/50 rounded-xl hover:bg-blue-700/50 transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              // Kirim event ke player (dijelaskan di AudioPlayer)
              window.dispatchEvent(
                new CustomEvent('playSong', { detail: { src: song.src, title: song.title, artist: song.artist, cover: song.cover } })
              );
            }}
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-40 h-40 object-cover rounded-full animate-spin-slow mx-auto"
            />
            <h2 className="text-lg mt-2 text-center truncate">{song.title}</h2>
            <p className="text-sm text-gray-300 text-center">{song.artist}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
                   }
