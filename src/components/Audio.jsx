import React, { useRef, useEffect } from 'react';
import { useCallback } from 'react';

import '../styles/components/audio.css';


export default function Audio({ song, playPause }) {
  const refAudio = useRef();


  const managePlayPause = useCallback(() => {
    if (song.playing) {
      refAudio.current.currentTime = 0;
      refAudio.current.volume = 0.2;
      refAudio.current.play();
      return;
    }
    refAudio.current.pause();
  }, [song.playing]);

  const manageEndSong = useCallback(() => playPause(song.id), [playPause, song.id]);

  useEffect(() => {
    const element = refAudio.current;
    element.addEventListener('ended', manageEndSong);

    return () => element.removeEventListener('ended', manageEndSong);
  }, [manageEndSong]);

  useEffect(() => {
    managePlayPause();
  }, [managePlayPause]);


  return (
    <div className="Audio">
      <button className="Audio__button" onClick={() => playPause(song.id)}>
        {song.playing ? 'Stop' : 'Play'}
      </button>
      <audio controls className="Audio__sample" ref={refAudio}>
        <source src={song.sample} type="audio/mp3" />
      </audio>
    </div>
  );
}
