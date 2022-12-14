import React, { useRef, useEffect, useCallback } from 'react';
import '../styles/components/audio.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

// Play and stop songs samples
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
    <div className='Audio'>
      <button className='Audio__button' onClick={() => playPause(song.id)}>
        {song.playing ? <StopIcon /> : <PlayArrowIcon />}
      </button>
      <audio controls className='Audio__sample' ref={refAudio}>
        <source src={song.sample ?? ''} type='audio/mp3' />
      </audio>
    </div>
  );
}
