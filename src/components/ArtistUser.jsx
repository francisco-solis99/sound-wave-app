import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';


export default function ArtistUser({ artist }) {
  return (
    <div className="dashboard__item ArtistUser">
      <div className="item__info">
        <p>{artist.name}</p>
        <p className="ArtistUser__info">
          <span>{artist.country}</span>
          <a href={artist.ytchannel} target='_blank' rel="noreferrer">
            <YouTubeIcon />
          </a>
        </p>
      </div>
    </div>
  );
}
