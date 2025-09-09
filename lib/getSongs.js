// lib/getSongs.js
export async function getSongs() {
  const musicDir = '/music/';
  const response = await fetch('/api/list-files');
  const files = await response.json();

  const songs = [];
  for (const file of files) {
    if (file.endsWith('.mp3')) {
      try {
        const metadata = await fetchMetadata(`${musicDir}${file}`);
        const cover = metadata.cover || '/img/placeholder.jpg';
        songs.push({
          id: file,
          title: metadata.title || file.replace('.mp3', ''),
          artist: metadata.artist || 'Unknown',
          src: `${musicDir}${file}`,
          cover,
        });
      } catch (error) {
        console.error(`Error reading metadata for ${file}:`, error);
        songs.push({
          id: file,
          title: file.replace('.mp3', ''),
          artist: 'Unknown',
          src: `${musicDir}${file}`,
          cover: '/img/placeholder.jpg',
        });
      }
    }
  }
  return songs;
}

async function fetchMetadata(url) {
  const mm = await import('music-metadata-browser');
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const metadata = await mm.parseBuffer(new Uint8Array(arrayBuffer), 'audio/mpeg');

  let cover = null;
  if (metadata.common.picture && metadata.common.picture[0]) {
    const picture = metadata.common.picture[0];
    cover = URL.createObjectURL(new Blob([picture.data], { type: picture.format }));
  }

  return {
    title: metadata.common.title,
    artist: metadata.common.artist,
    cover,
  };
}
