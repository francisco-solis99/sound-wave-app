import React, { useRef, useEffect, useCallback, useState } from 'react';
import '../styles/components/audio.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Play and stop songs samples
export default function Audio({ song, playPause }) {
  const refAudio = useRef();
  const [open, setOpen] = useState(false);

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

  const handleClick = () => {
    if (song.sample === undefined) setOpen(true);
    playPause(song.id);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className='Audio'>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Not available 😢"
        action={action}
      />
      <button className='Audio__button' onClick={handleClick}>
        {song.playing ? <StopIcon /> : <PlayArrowIcon />}
      </button>
      <audio controls className='Audio__sample' ref={refAudio}>
        <source src={song.sample ?? ''} type='audio/mp3' />
      </audio>
    </div>
  );
}


