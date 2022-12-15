import React from 'react';
import '../styles/components/song.css';
import Audio from './Audio';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export default function Song(props) {
  
  return (
    <div className='Song__container'>
      <Audio song={props.songData} playPause={props.playPause} />
      <div className='Song__info'>
        <p className='Song__name'>{props.songData.name} - {props.songData.artist.name}</p>
        {/* Only show add icon when user is logged */}
        <p className='Song__name'>{props.songData.year}
          {
            props.showAddIcon ? <AddCircleOutlineRoundedIcon data-bs-toggle='modal' data-bs-target='#modalAddToTop' onClick={ () => props.setSelectedSong(props.songData.id)} /> : ''
          }
        </p>
      </div>
    </div >
  );
}
