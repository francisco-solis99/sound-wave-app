import React, { useState } from 'react';
import '../styles/components/modals.css';
// import { createGenre } from '../services/genres/genres';

export default function FormNewGenre({ userData, setAlert, setSuccess }) {
    const IMAGE_URL_DEFAULT =
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

    const [genreName, setGenreName] = useState('');
    const [genreImageURL, setGenreImageURL] = useState(IMAGE_URL_DEFAULT);

    const handleGenreSubmit = (e) => {
        console.log(genreName, genreImageURL);
        // createGenre(e, genreName, genreImageURL)
        //     .then(response => setSuccess(response.ok));
        setGenreName('');
        setGenreImageURL(IMAGE_URL_DEFAULT);
        setAlert(true);
        setSuccess(false);
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
