import React from 'react';
import '../styles/components/artist.css';

export default function Artist({ artistData, setModalArtistData }) {
    return (
        <div className='Artist' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.7), rgba(98, 49, 152, 0.7), rgba(52, 56, 127, 0.7), rgba(30, 52, 93, 0.7), rgba(33, 43, 56, 0.7)), url(' + artistData.urlImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '500px'
        }}>
            <h1>{artistData.name}</h1>
            <button className='btn Artist__btn' data-bs-toggle="modal" data-bs-target="#modalArtist" onClick={() => { setModalArtistData(artistData); }}>More</button>
        </div>
    );
}
