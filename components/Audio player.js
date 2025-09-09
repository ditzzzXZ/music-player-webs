'use client';

import { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import { getSongs } from '../lib/getSongs';

export default function AudioPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [play, { pause, duration, sound }] = useSound(currentSong?.src || '', {
    interrupt: true,
    onend: () => nextSong(),
  });

  useEffect(() => {
    async function fetchSongs() {
      const songList = await getSongs();
      setSongs(songList);
      if (songList.length > 0) {
        setCurrentSong(songList[0]); // Default ke lagu pertama
      }
    }
    fetchSongs();
  }, []);

  useEffect(() => {
    const handlePlaySong = (event) => {
      setCurrentSong(event.detail);
      setIsPlaying(false); // Reset play state
      pause(); // Pause lagu sebelumnya
    };
    window.addEventListener('playSong', handlePlaySong);
    return () => window.removeEventListener('playSong', handlePlaySong);
  }, [pause]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        setProgress((sound.seek() / duration) * 100 || 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sound, duration]);

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (!songs.length) return;
    const currentIndex = songs.findIndex((s) => s.src === currentSong.src);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(false);
  };

  const prevSong = () => {
    if (!songs.length) return;
    const currentIndex = songs.findIndex((s) => s.src === currentSong.src);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(false);
  };

  if (!currentSong) return <div className="text-center">No song selected 😔</div>;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center w-1/3">
        <img
          src={currentSong.cover}
          alt="Cover"
          className="w-10 h-10 rounded-full mr-4 animate-spin-slow"
        />
        <div>
          <div className="truncate">{currentSong.title}</div>
          <div className="text-sm text-gray-300">{currentSong.artist}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={prevSong} className="p-2 rounded-full hover:bg-blue-700 transition">
          ⏮
        </button>
        <button onClick={togglePlay} className="p-2 rounded-full hover:bg-blue-700 transition">
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button onClick={nextSong} className="p-2 rounded-full hover:bg-blue-700 transition">
          ⏭
        </button>
      </div>
      <div className="w-1/3 bg-blue-800 rounded-full h-2">
        <div className="bg-cyan-300 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
      }
