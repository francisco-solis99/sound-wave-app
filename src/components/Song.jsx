import React from 'react';

export default function Song(props) {
  return (
    <div className="Song__container">
      <p className="Song__name">{props.songData.name}</p>
      <p className="Song__year">{props.songData.year}</p>
      <audio controls className="Song__sample">
        <source src={props.songData.sample} type="audio/ogg" />
      </audio>
    </div>
  );
}
