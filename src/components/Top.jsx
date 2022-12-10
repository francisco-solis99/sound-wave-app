import React from 'react';

export default function Top({ top }) {
  return (
    <div className="Top">
      <div className="Top__icon">
      </div>
      <div className="Top__info">
        <p>{top.name}</p>
        <button className="Top__button-more">see songs</button>
      </div>
    </div>
  );
}
