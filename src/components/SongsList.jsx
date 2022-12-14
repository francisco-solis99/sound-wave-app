import React, { useState, useEffect } from 'react';
import '../styles/components/songslist.css';
import Song from './Song';

// Display list of songs and controlle playing and pausing
export default function SongsList({ songs }) {
  const [songsList, setSongsList] = useState([]);

  useEffect(() => setSongsList(songs), [songs]);

  const playPause = (idSong) => {
    const songsList = [...songs];
    songsList.forEach((song) => {
      if (song.id !== idSong) {
        song.playing = false;
        return;
      }
      song.playing = !song.playing;
    });
    setSongsList(songsList);
  };

  return (
    <section className="SongsList">
      {
        songsList.map(song => <Song key={song.id} songData={song} playPause={playPause} />)
      }
    </section>
  );
}
