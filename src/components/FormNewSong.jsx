import React, { useState } from 'react';
import '../styles/components/modals.css';
import { Alert } from '@mui/material';
// import { createSong } from '../services/songs/songs';

export default function FormNewSong({ userData, setAlert, setSuccess, message, setMessage }) {
    // const USER_ID = 2;

    const artists = [{
        name: 'Taylor Swift',
        id: 1
    }, {
        name: 'Rihanna',
        id: 2
    },
    {
        name: 'Tini',
        id: 3
    }];

    const genres = [{
        name: 'Pop',
        id: 1
    }, {
        name: 'Rock',
        id: 2
    },
    {
        name: 'Indie',
        id: 3
    }];

    const [songName, setSongName] = useState('');
    const [songYear, setSongYear] = useState('');
    const [songYoutube, setSongYoutube] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [songGenre, setSongGenre] = useState('');

    const handleSongSubmit = (e) => {
        e.preventDefault();
        if (artistExists() && genreExists()) {
            console.log(songName, songYear, songYoutube, songArtist, songGenre);
            setAlert(true);
            setSuccess(true);
            setMessage('');
            setSongName('');
            setSongYear('');
            setSongYoutube('');
            setSongArtist('');
            setSongGenre('');
        }
    };

    const artistExists = () => {
        const res = artists.filter(artist => artist.name.includes(songArtist));// artist.name.includes
        if (res.length > 0) {
            setSongArtist(res[0].id);
            return true;
        } else {
            setMessage('We could not find the artist. Please create it first');
            return false;
        }
    };

    const genreExists = () => {
        const res = genres.filter(genre => genre.name.includes(songGenre));// artist.name.includes
        if (res.length > 0) {
            setSongGenre(res[0].id);
            return true;
        } else {
            setMessage('We could not find the genre. Please create it first');
            return false;
        }
    };

    return (
        <form onSubmit={handleSongSubmit}>
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
                        list="song-artists"
                        name='songArtist'
                        id='songArtist'
                        required
                        onChange={(e) => setSongArtist(e.target.value)}
                    ></input>
                    <datalist id="song-artists">
                        {
                            artists.map(artist => <option key={artist.id} data-value={artist.id} value={artist.name} />)
                        }
                    </datalist>
                </label>
            </div>
            <div className='modal-input'>
                <label className='modal-label' htmlFor='songGenre'>
                    Genre:
                    <input
                        className='modal-input-field'
                        list="song-genres"
                        name='songGenre'
                        id='songGenre'
                        required
                        onChange={(e) => setSongGenre(e.target.value)}
                    ></input>
                    <datalist id="song-genres">
                        {
                            genres.map(artist => <option key={artist.id} data-value={artist.id} value={artist.name} />)
                        }
                    </datalist>
                </label>
            </div>
            {
                message.length > 0 ? <Alert severity="warning" style={{ margin: '1rem 0' }}> {message} </Alert> : ''
            }

            <input
                type='submit'
                value='Submit'
                className='btn btn-primary'
            />
        </form>
    );
}
