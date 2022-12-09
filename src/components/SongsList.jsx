import React, { useState } from 'react';
import { useEffect } from 'react';
import Song from './Song';

import '../styles/components/songslist.css';

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
