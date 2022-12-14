import React from 'react';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function SongUser(props) {
  return (
    <div className='dashboard__item SongUser'>
      <div className='item__icon'>
        <LibraryMusicIcon />
      </div>
      <div className='item__info'>
        <p className='Song__name'>{props.songData.name} ({props.songData.year})</p>
        <p className='Song__name'>{props.songData.artist.name}</p>
      </div>
    </div>
  );
}
