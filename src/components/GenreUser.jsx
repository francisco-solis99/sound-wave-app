import React from 'react';
import AlbumIcon from '@mui/icons-material/Album';

export default function GenreUser({ genre }) {
  return (
    <div className='dashboard__item GenreUser'>
      <div className='item__icon'>
        <AlbumIcon />
      </div>
      <div className='item__info GenreUser__info'>
        <p>{genre.name}</p>
      </div>
    </div>
  );
}
