import React from 'react';
import '../styles/components/artist.css';

export default function Artist({ props, setModalArtistData }) {

    return (
        <div className='artist' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(' + props.link + ')'
        }}>
            <h1 className='artist-title'>{props.name}</h1>
            <button className='btn artist-btn' data-bs-toggle="modal" data-bs-target="#modalArtist" onClick={() => { setModalArtistData(props); }}>More</button>
        </div>
    );
}
