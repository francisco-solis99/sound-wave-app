import React from 'react';
import '../styles/components/modals.css';

export default function ModalArtist({props}) {
  return (
    <div className="modal fade" id="modalArtist" tabIndex={-1} aria-labelledby="modalArtistLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header modal-img">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 className="modal-title" id="modalArtistLabel"> {props.name} </h1>
          </div>

          <div className="modal-body">
            <p><span className='modal-label'>Country: </span> {props.country} </p>
            <p><span className='modal-label'>Genre: </span> {props.genres} </p>
            <p><span className='modal-label'>Tops: </span> {props.tops} </p>

            {/* Add button for songs and youtube  */}
          </div>

        </div>
      </div>
    </div>
  );
}
