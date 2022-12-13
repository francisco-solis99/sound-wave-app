import React from 'react';
import { useState } from 'react';
import '../styles/components/modals.css';
import { createTop } from '../services/tops/tops';
import { Alert, AlertTitle } from '@mui/material';

export default function ModalCreate() {
    const USER_ID = 2;

    const IMAGE_URL_DEFAULT =
        'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

    const [option, setOption] = useState('');

    const [topName, setTopName] = useState('');
    const [topDescription, setTopDescription] = useState('');

    const [songName, setSongName] = useState('');
    const [songYear, setSongYear] = useState('');
    const [songYoutube, setSongYoutube] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [songGenre, setSongGenre] = useState('');

    const [artistName, setArtistName] = useState('');
    const [artistCountry, setArtistCountry] = useState('');
    const [artistYoutube, setArtistYoutube] = useState('');
    const [artistImageURL, setArtistImageURL] = useState(IMAGE_URL_DEFAULT);

    const [genreName, setGenreName] = useState('');
    const [genreImageURL, setGenreImageURL] = useState(IMAGE_URL_DEFAULT);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (option) {
            case 'top':
                console.log(topName, topDescription);
                createTop(e, topName, topDescription, USER_ID);
                setTopName('');
                setTopDescription('');
                setAlert(true);
                setSuccess(true);
                break;
            case 'song':
                console.log(songName, songYear, songYoutube, songArtist, songGenre);
                setSongName('');
                setSongYear('');
                setSongYoutube('');
                setSongArtist('');
                setSongGenre('');
                setAlert(true);
                setSuccess(true);
                break;
            case 'artist':
                console.log(artistName, artistCountry, artistYoutube, artistImageURL);
                setArtistName('');
                setArtistCountry('');
                setArtistYoutube('');
                setArtistImageURL(IMAGE_URL_DEFAULT);
                setAlert(true);
                setSuccess(true);
                break;
            case 'genre':
                console.log(genreName, genreImageURL);
                setGenreName('');
                setGenreImageURL(IMAGE_URL_DEFAULT);
                setAlert(true);
                setSuccess(false);
                break;
            default:
                break;
        }
    };

    return (
        <div
            className='modal fade'
            id='modalCreate'
            tabIndex={-1}
            aria-labelledby='modalCreateLabel'
            aria-hidden='true'>
            <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                <div className='modal-content'>
                    {alert &&
                        <Alert severity={success ? 'success' : 'error'}>
                            <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                            {success ? <p>New {option} created <strong>successfully</strong>.</p> :
                                <p>Some error occured when creating new {option}.</p>}
                        </Alert>
                    }

                    <div className='modal-header'>
                        <h1 className='modal-title' id='modalCreateLabel'>
                            Create
                        </h1>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>

                    <div className='modal-body'>
                        <label className='modal-label'>New:
                            <select className='modal-input-field' name='select' onChange={(e) => {
                                setOption(e.target.value);
                                setAlert(false);
                            }}>
                                <option value=''>Select an option</option>
                                <option value='top'>Top</option>
                                <option value='song'>Song</option>
                                <option value='artist'>Artist</option>
                                <option value='genre'>Genre</option>
                            </select>
                        </label>

                        {option !== '' && (
                            <p>
                                Okay! Let's create a new {option}. Please provide the following:{' '}
                            </p>
                        )}

                        {option === 'top' && (
                            <form onSubmit={handleSubmit}>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='topName'>
                                        Name:
                                        <input
                                            className='modal-input-field'
                                            type='text'
                                            name='topName'
                                            id='topName'
                                            required
                                            onChange={(e) => setTopName(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='topDescription'>
                                        Description:
                                        <input
                                            className='modal-input-field'
                                            type='text'
                                            name='topDescription'
                                            id='topDescription'
                                            required
                                            onChange={(e) => setTopDescription(e.target.value)}
                                        ></input>
                                    </label>
                                </div>

                                <input
                                    type='submit'
                                    value='Submit'
                                    className='btn btn-primary'
                                />
                            </form>
                        )}

                        {option === 'song' && (
                            <form onSubmit={handleSubmit}>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='songName'>
                                        Name:
                                        <input
                                            className='modal-input-field'
                                            type='text'
                                            name='songName'
                                            id='songName'
                                            required
                                            onChange={(e) => setSongName(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='songYear'>
                                        Year:
                                        <input
                                            className='modal-input-field'
                                            type='number'
                                            min='1700'
                                            max={new Date().getFullYear()}
                                            step='1'
                                            name='songYear'
                                            id='songYear'
                                            required
                                            onChange={(e) => setSongYear(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='songYoutube'>
                                        Youtube:
                                        <input
                                            className='modal-input-field'
                                            type='url'
                                            name='songYoutube'
                                            id='songYoutube'
                                            required
                                            onChange={(e) => setSongYoutube(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='songArtist'>
                                        Artist:
                                        <input
                                            className='modal-input-field'
                                            name='songArtist'
                                            id='songArtist'
                                            required
                                            onChange={(e) => setSongArtist(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <div className='modal-input'>
                                    <label className='modal-label' htmlFor='songGenre'>
                                        Genre:
                                        <input
                                            className='modal-input-field'
                                            name='songGenre'
                                            id='songGenre'
                                            required
                                            onChange={(e) => setSongGenre(e.target.value)}
                                        ></input>
                                    </label>
                                </div>
                                <input
                                    type='submit'
                                    value='Submit'
                                    className='btn btn-primary'
                                />
                            </form>
                        )}

                        {option === 'artist' && (
                            <form onSubmit={handleSubmit}>
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
                        )}

                        {option === 'genre' && (
                            <form onSubmit={handleSubmit}>
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
