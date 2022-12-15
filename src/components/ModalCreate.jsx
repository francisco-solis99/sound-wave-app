import React, { useState } from 'react';
import '../styles/components/modals.css';
import { Alert, AlertTitle } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import FormNewTop from './FormNewTop';
import FormNewArtist from './FormNewArtist';
import FormNewGenre from './FormNewGenre';
import FormNewSong from './FormNewSong';

// Bootstrap component modal for displaying create forms
export default function ModalCreate({ userId, handlerChangeUserTops, handlerChangeUserGenres, handlerChangeUserArtists, handlerChangeUserSongs }) {
    const [option, setOption] = useState('');
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(true);
    const [message, setMessage] = useState('');

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
                        <Collapse in={alert}>
                            <Alert severity={success ? 'success' : 'error'}>
                                <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                                {success ? <p>New {option} created <strong>successfully</strong>.</p> :
                                    <p>Some error occured when creating new {option}.</p>}
                            </Alert>
                        </Collapse>
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
                                setMessage('');
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
                            <FormNewTop userId={userId} handlerChangeUserTops={handlerChangeUserTops} setAlert={setAlert} setSuccess={setSuccess} />
                        )}

                        {option === 'song' && (
                            <FormNewSong userId={userId} handlerChangeUserSongs={handlerChangeUserSongs} setAlert={setAlert} setSuccess={setSuccess} message={message} setMessage={setMessage} />
                        )}

                        {option === 'artist' && (
                            <FormNewArtist userId={userId} handlerChangeUserArtists={handlerChangeUserArtists} setAlert={setAlert} setSuccess={setSuccess} />
                        )}

                        {option === 'genre' && (
                            <FormNewGenre userId={userId} handlerChangeUserGenres={handlerChangeUserGenres} setAlert={setAlert} setSuccess={setSuccess} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
