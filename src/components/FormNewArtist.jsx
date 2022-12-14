import React, { useState } from 'react';
import '../styles/components/modals.css';
import { createArtist } from '../services/artists/artists';

// Display the form for creating a new Artist
// Handle the POST method to create a new Artist
export default function FormNewArtist({ setAlert, setSuccess }) {
    const IMAGE_URL_DEFAULT =
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

    const [artistName, setArtistName] = useState('');
    const [artistCountry, setArtistCountry] = useState('');
    const [artistYoutube, setArtistYoutube] = useState('');
    const [artistImageURL, setArtistImageURL] = useState(IMAGE_URL_DEFAULT);

    const handleArtistSubmit = (e) => {
        e.preventDefault();
        console.log(artistName, artistCountry, artistYoutube, artistImageURL);
        createArtist(artistName, artistCountry, artistYoutube, artistImageURL)
            .then(response => {
                setSuccess(response.ok);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setArtistName('');
                setArtistCountry('');
                setArtistYoutube('');
                setArtistImageURL(IMAGE_URL_DEFAULT);
                setAlert(true);
            });
    };

    return (
        <form onSubmit={handleArtistSubmit}>
            <div className='modal-input'>
                <label className='modal-label' htmlFor='artistName'>
                    Name:
                    <input
                        className='modal-input-field'
                        type='text'
                        name='artistName'
                        id='artistName'
                        required
                        onChange={(e) => setArtistName(e.target.value)}
                    ></input>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='artistCountry'>
                    Country:
                    <input
                        className='modal-input-field'
                        type='text'
                        name='artistCountry'
                        id='artistCountry'
                        required
                        onChange={(e) => setArtistCountry(e.target.value)}
                    ></input>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='artistYoutube'>
                    Youtube:
                    <input
                        className='modal-input-field'
                        type='url'
                        name='artistYoutube'
                        id='artistYoutube'
                        required
                        onChange={(e) => setArtistYoutube(e.target.value)}
                    ></input>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='artistImageURL'>
                    ImageURL:
                    <input
                        className='modal-input-field'
                        type='url'
                        name='artistImageURL'
                        id='artistImageURL'
                        onChange={(e) => setArtistImageURL(e.target.value)}
                    ></input>
                </label>
            </div>

            <input
                type='submit'
                value='Submit'
                className='btn btn-primary'
            />
        </form>

    );
}
