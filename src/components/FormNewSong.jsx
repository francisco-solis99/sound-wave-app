import React, { useState, useEffect } from 'react';
import '../styles/components/modals.css';
import { Alert } from '@mui/material';
import { getArtists } from '../services/artists/artists';
import { getAllGenres } from '../services/genres/genres';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';
// import { createSong } from '../services/songs/songs';

export default function FormNewSong({ userData, setAlert, setSuccess, message, setMessage }) {
    const USER_ID = 2;
    const [isLoading, setIsLoading] = useState(true);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);

    const [songName, setSongName] = useState('');
    const [songYear, setSongYear] = useState('');
    const [songYoutube, setSongYoutube] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [songGenre, setSongGenre] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            getArtists({ limit: 8 })
                .then(data => setArtists(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }, 100);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            getAllGenres()
                .then(data => setGenres(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }, 100);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getArtistsByUser(USER_ID)
            .then(artistsUser => setArtists(prevArtists => [...prevArtists, artistsUser]))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getGenresByUser(USER_ID)
            .then(genresUser => setGenres(prevGenres => [...prevGenres, genresUser]))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

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
        const res = artists.filter(artist => artist.name.includes(songArtist));
        if (res.length > 0) {
            setSongArtist(res[0].id);
            return true;
        } else {
            setMessage('We could not find the artist. Please create it first');
            return false;
        }
    };

    const genreExists = () => {
        const res = genres.filter(genre => genre.name.includes(songGenre));
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
                        onChange={(e) => setSongName(e.target.value)}>
                    </input>
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
                        onChange={(e) => setSongYear(e.target.value)}>
                    </input>
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
                        onChange={(e) => setSongYoutube(e.target.value)}>
                    </input>
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
                        onChange={(e) => setSongArtist(e.target.value)}>
                    </input>
                    <datalist id="song-artists">
                        {
                            !isLoading && artists.map(artist => <option key={artist.id} data-value={artist.id} value={artist.name} />)
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
                        onChange={(e) => setSongGenre(e.target.value)}>
                    </input>
                    <datalist id="song-genres">
                        {
                            !isLoading && genres.map(artist => <option key={artist.id} data-value={artist.id} value={artist.name} />)
                        }
                    </datalist>
                </label>
            </div>
            {
                message.length > 0 ? <Alert severity="warning" style={{ margin: '1rem 0' }}> {message} </Alert> : ''
            }

            <input type='submit' value='Submit' className='btn btn-primary' />
        </form>
    );
}
