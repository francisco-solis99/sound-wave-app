import React from 'react';
import '../styles/components/topsongs.css';

export default function TopSongs(props) {

  return (
    <article className="Top__songs">
      <h3 className="Tops__songs-title">{props.topData.name}</h3>
      <p className="Tops__songs-description">{props.topData.description}</p>
      <div className="Top__songs-wrapper">
        <ol className='Top__songs-list'>
          {
            props.topData.songs.map(song =>
              <li className="Top__songs-item" key={crypto.randomUUID()}>{song.name} - {song.artist.name}</li>
            )
          }
        </ol>
      </div>
    </article>
  );
}
