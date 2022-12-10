import React from 'react';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';

export default function TopUser({ top, setModalTopData }) {
  return (
    <div className="dashboard__item TopUser">
      <div className="item__icon">
        <AudiotrackIcon />
      </div>
      <div className="item__info Top__info">
        <p>{top.name}</p>
        <button className="Top__button-more" data-bs-toggle="modal" data-bs-target="#modalTop" onClick={() => setModalTopData(top)}>see songs</button>
      </div>
    </div>
  );
}
