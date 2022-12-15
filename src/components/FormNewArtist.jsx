import React, { useState } from 'react';
import '../styles/components/modals.css';
import { createArtist } from '../services/artists/artists';

// Display the form for creating a new Artist
// Handle the POST method to create a new Artist
export default function FormNewArtist({ userId, setAlert, setSuccess, handlerChangeUserArtists }) {
    const [artistName, setArtistName] = useState('');
    const [artistCountry, setArtistCountry] = useState('');
    const [artistYoutube, setArtistYoutube] = useState('');
    const [artistImageURL, setArtistImageURL] = useState('');

    const handleArtistSubmit = (e) => {
        e.preventDefault();
        createArtist(artistName, artistCountry, artistYoutube, artistImageURL, userId.current)
            .then(async (response) => {
                const { data: newArtist } = await response.json();
                setSuccess(response.ok);
                 if (response.ok){
                    handlerChangeUserArtists((prev) => {
                        return [
                            ...prev,
                            newArtist
                        ];
                    });
                 } 
            })
            .catch(err => console.log(err))
            .finally(() => {
                setArtistName('');
                setArtistCountry('');
                setArtistYoutube('');
                setArtistImageURL('');
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 2000);
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
                        value={artistName || ''}
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
                        value={artistCountry || ''}
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
                        value={artistYoutube || ''}
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
                        value={artistImageURL || ''}
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
