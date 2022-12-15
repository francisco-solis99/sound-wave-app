import React from 'react';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export default function SongUser(props) {
  return (
    <div className='dashboard__item SongUser'>
      <div className='item__icon'>
        <LibraryMusicIcon />
      </div>
      <div className='item__info'>
        <p className='Song__name'>{props.songData.name}</p>
        <p className='Song__name'>{props.songData.artist.name}
          <span className="Song__add">
            <AddCircleOutlineRoundedIcon data-bs-toggle='modal' data-bs-target='#modalAddToTop' onClick={() => props.setSelectedSong(props.songData)} />
          </span>
        </p>
      </div>
    </div>
  );
}
