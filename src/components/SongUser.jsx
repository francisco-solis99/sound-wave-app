import React from 'react';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export default function SongUser(props) {
  console.log(props.songData);
  return (
    <div className='dashboard__item SongUser'>
      <div className='item__icon'>
        <LibraryMusicIcon />
      </div>
      <div className='item__info'>
        <p className='Song__name'>{props.songData.name}</p>
        <p className='Song__name'>{props.songData.artist.name}<AddCircleOutlineRoundedIcon data-bs-toggle='modal' data-bs-target='#modalAddToTop' onClick={() => props.setSelectedSong(props.songData.id)} /> </p>
      </div>
    </div>
  );
}
