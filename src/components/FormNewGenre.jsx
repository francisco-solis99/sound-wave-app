import React, { useState } from 'react';
import '../styles/components/modals.css';
import { createGenre } from '../services/genres/genres';

// Display the form for creating a new Genre
// Handle the POST method to create a new Genre
export default function FormNewGenre({ userId, setAlert, setSuccess, handlerChangeUserGenres }) {
    const [genreName, setGenreName] = useState('');
    const [genreImageURL, setGenreImageURL] = useState('');

    const handleGenreSubmit = (e) => {
        e.preventDefault();
        createGenre(genreName, genreImageURL, userId.current)
            .then(async (response) => {
                const { data: newGenre } = await response.json();
                handlerChangeUserGenres((prev) => {
                    return [
                        ...prev,
                        newGenre
                    ];
                });
                setSuccess(response.ok);
            })
            .catch(err => console.log(err))
            .finally(() => {
                setGenreName('');
                setGenreImageURL('');
                setAlert(true);
            });
    };

    return (
        <form onSubmit={handleGenreSubmit}>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='genreName'>
                    Name:
                    <input
                        className='modal-input-field'
                        type='text'
                        name='genreName'
                        id='genreName'
                        value={genreName || ''}
                        required
                        onChange={(e) => setGenreName(e.target.value)}
                    ></input>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='genreImageURL'>
                    ImageURL:
                    <input
                        className='modal-input-field'
                        type='url'
                        name='genreImageURL'
                        id='genreImageURL'
                        value={genreImageURL || ''}
                        onChange={(e) => setGenreImageURL(e.target.value)}
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
