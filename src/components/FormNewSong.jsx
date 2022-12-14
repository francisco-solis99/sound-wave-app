import React, { useState, useEffect } from 'react';
import '../styles/components/modals.css';
import { Alert } from '@mui/material';
import { getArtists } from '../services/artists/artists';
import { getGenres } from '../services/genres/genres';
import { getArtistsByUser } from '../services/artists/artists';
import { getGenresByUser } from '../services/genres/genres';
import { createSong } from '../services/songs/songs';
import { getUser } from '../services/auth/auth';

// Display the form for creating a new Song
// Handle the POST method to create a new Song
export default function FormNewSong({ setAlert, setSuccess, message, setMessage }) {
    const USER_ID = JSON.parse(getUser()).userId;


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
            getArtists({ limit: null })
                .then(data => setArtists(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }, 100);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            getGenres({ limit: null })
                .then(data => setGenres(data))
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false));
        }, 100);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getArtistsByUser(USER_ID)
            .then(artistsUser =>
                artistsUser.map(artistUser =>
                    artists.indexOf(artistUser) !== -1 ? setArtists(prevArtists => [...prevArtists, artistUser]) : ''))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getGenresByUser(USER_ID)
            .then(genresUser =>
                // Add unique genres
                genresUser.map(genreUser =>
                    genres.indexOf(genreUser) !== -1 ? setGenres(prevGenres => [...prevGenres, genreUser]) : ''))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSongSubmit = (e) => {
        e.preventDefault();
        const artistId = getArtistId();
        const genreId = getGenreId();

        if (artistId !== -1 && genreId !== -1) {
            createSong(songName, songYear, songYoutube, artistId, genreId)
                .then(response => setSuccess(response.ok))
                .catch((err) => console.log(err))
                .finally(() => {
                    setAlert(true);
                    setSuccess(true);
                    setMessage('');
                    setSongName('');
                    setSongYear('');
                    setSongYoutube('');
                    setSongArtist('');
                    setSongGenre('');
                });
        }
    };

    const getArtistId = () => {
        const res = artists.filter(artist => artist.name.includes(songArtist));
        return res.length > 0 ? res[0].id : -1;
    };

    const getGenreId = () => {
        const res = genres.filter(genre => genre.name.includes(songGenre));
        return res.length > 0 ? res[0].id : -1;
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
                        value={songName || ''}
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
                        value={songYear || ''}
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
                        value={songYoutube || ''}
                        onChange={(e) => setSongYoutube(e.target.value)}>
                    </input>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='songArtist'>
                    Artist:
                    <input
                        className='modal-input-field'
                        list='song-artists'
                        name='songArtist'
                        id='songArtist'
                        required
                        value={songArtist || ''}
                        onChange={(e) => setSongArtist(e.target.value)}>
                    </input>
                    <datalist id='song-artists'>
                        {
                            !isLoading && artists.map(artist => <option key={artist.id} value={artist.name} />)
                        }
                    </datalist>
                </label>
            </div>

            <div className='modal-input'>
                <label className='modal-label' htmlFor='songGenre'>
                    Genre:
                    <input
                        className='modal-input-field'
                        list='song-genres'
                        name='songGenre'
                        id='songGenre'
                        required
                        value={songGenre || ''}
                        onChange={(e) => setSongGenre(e.target.value)}>
                    </input>
                    <datalist id='song-genres'>
                        {
                            !isLoading && genres.map(genre => <option key={genre.id} value={genre.name} />)
                        }
                    </datalist>
                </label>
            </div>

            {
                message.length > 0 ? <Alert severity='warning' style={{ margin: '1rem 0' }}> {message} </Alert> : ''
            }

            <input type='submit' value='Submit' className='btn btn-primary' />
        </form>
    );
}
