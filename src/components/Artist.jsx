import React from 'react';
import '../styles/components/artist.css';

export default function Artist({ artistData, setModalArtistData }) {
    return (
        // TODO: Use url from artistData
        // <div className='artist' style={{
        //     backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(' + artistData.link + ')'
        // }}>
        <div className='artist' style={{
            backgroundImage: 'linear-gradient(to right top, rgba(154, 0, 162, 0.6), rgba(98, 49, 152, 0.6), rgba(52, 56, 127, 0.6), rgba(30, 52, 93, 0.6), rgba(33, 43, 56, 0.6)), url(https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&w=800)'
        }}>
            <h1 className='artist-title'>{artistData.name}</h1>
            <button className='btn artist-btn' data-bs-toggle="modal" data-bs-target="#modalArtist" onClick={() => { setModalArtistData(artistData); }}>More</button>
        </div>
    );
}
