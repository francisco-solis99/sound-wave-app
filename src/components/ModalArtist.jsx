import React from 'react';
import '../styles/components/modals.css';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Bootstrap component modal for Artist info
export default function ModalArtist({ artistData }) {
  return (
    <div className='modal fade' id='modalArtist' tabIndex={-1} aria-labelledby='modalArtistLabel' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          
          <div className='modal-header modal-img' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(' + artistData.urlImage + ')'
          }}>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            <h1 className='modal-title' id='modalArtistLabel'> {artistData.name} </h1>
          </div>

          <div className='modal-body'>
            <p><span className='modal-label'>Country: </span> {artistData.country} </p>

            <a className='modal-youtube' href={artistData.ytchannel} target='_blank' rel='noreferrer'>
              <YouTubeIcon fontSize='large' style={{ color: 'black' }} />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
