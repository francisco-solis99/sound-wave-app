import React from 'react';
import '../styles/components/modals.css';

// Bootstrap component modal for Top info
export default function ModalTop({ topData }) {
  return (
    <div className="modal fade" id="modalTop" tabIndex={-1} aria-labelledby="modalTopLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header modal-img">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 className="modal-title" id="modalTopLabel">{topData.name}</h1>
          </div>

          <div className="modal-body">
            <p className='modal-top-description'>{topData.description}</p>
            {typeof topData.songs !== 'undefined' && topData.songs.length > 0 &&
              <ol>
                {
                  topData.songs.map(song =>
                    <li key={song.name}> {song.name} - {song.artist.name}</li>)
                }
              </ol>}
          </div>
        </div>
      </div>
    </div>
  );
}
