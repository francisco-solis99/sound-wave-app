import React from 'react';


export default function TopSongs(props) {

  return (
    <article>
      <h3>{props.topData.name}</h3>
      <div className="Top__songs-wrapper">
        <div className="Top__songs">
          <ol className='Top__songs-list'>
            {
              props.topData.songs.map(song =>
                <li className="Top__songs-item" key={crypto.randomUUID()}>{song.name}</li>
              )
            }
          </ol>
        </div>
      </div>
    </article>
  );
}
