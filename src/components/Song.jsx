import React from 'react';
import '../styles/components/song.css';
import Audio from './Audio';

export default function Song(props) {
  return (
    <div className='Song__container'>
      <Audio song={props.songData} playPause={props.playPause} />
      <div className='Song__info'>
        <p className='Song__name'>{props.songData.name} - {props.songData.artist.name}</p>
        <p className='Song__year'>{props.songData.year}</p>
      </div>
    </div>
  );
}
