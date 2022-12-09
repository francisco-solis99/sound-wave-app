import React from 'react';
import '../styles/components/modals.css';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function ModalArtist({ props }) {

  return (
    <div className="modal fade" id="modalArtist" tabIndex={-1} aria-labelledby="modalArtistLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-img" style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(' + props.link + ')'
          }}>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 className="modal-title" id="modalArtistLabel"> {props.name} </h1>
          </div>

          <div className="modal-body">
            <p><span className='modal-label'>Country: </span> {props.country} </p>
            <p><span className='modal-label'>Genre: </span> {props.genres} </p>
            <p><span className='modal-label'>Tops: </span> {props.tops} </p>

            {/* Add button for songs and youtube  */}
            <a className='modal-youtube' href={props.youtube} target='_blank' rel="noreferrer">
              <YouTubeIcon fontSize='large' />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
