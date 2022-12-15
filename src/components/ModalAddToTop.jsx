import React, { useState, useEffect } from 'react';
import '../styles/components/modals.css';
import { Alert, AlertTitle } from '@mui/material';
import { addSongToTop } from '../services/topSongs/topSongs';

const phrases = ['I like this one too.', 'Awesome song!', 'Yep, this songs deserves to be in your tops', 'Great song!', 'Same! very catchy song', 'Curious about which top you will put this song in.', 'Actually, I can\'t stop listening to this song'];

// Bootstrap component modal to add song to a top
export default function ModalAddToTop({ topByUser, song, handlerTopSongsChange }) {
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(true);
    const [phrase, setPhrase] = useState(phrases[0]);
    const [top, setTop] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const index = Math.floor(Math.random() * phrases.length);
        setPhrase(phrases[index]);
        setIsLoading(false);
    }, []);

    const handleAddToTopSubmit = (e) => {
        e.preventDefault();
        addSongToTop(top, song.id)
            .then(response => {
                setSuccess(response.ok);
                handlerTopSongsChange(prev => {
                    const prevCopy = { ...prev };
                    prevCopy.songs.push(song);
                    return prevCopy;
                });
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setTop('');
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 1500);
            });
    };

    return (
        <div className='modal fade' id='modalAddToTop' tabIndex={-1} aria-labelledby='modalAddToTopLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-scrollable modal-dialog-centered'>
                <div className='modal-content'>
                    {alert &&
                        <Alert severity={success ? 'success' : 'error'}>
                            <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                            {success ? <p>Song added <strong>successfully</strong>.</p> :
                                <p>Some error occured when adding this song to the top.</p>}
                        </Alert>
                    }

                    <div className='modal-header modal-img'>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        <h1 className='modal-title' id='modalTopLabel'>Add to top</h1>
                    </div>

                    <div className='modal-body'>
                        <p className='modal-top-description modal-add-description'>{phrase}</p>

                        <form onSubmit={handleAddToTopSubmit}>
                            <div className='modal-input'>
                                <label className='modal-label' htmlFor='userTops'>
                                    Your tops:
                                    <select className='modal-input-field' value={top} id="userTops" name='userTops' onChange={e => setTop(e.target.value)} >
                                        <option value={''} disabled></option>
                                        {
                                            !isLoading && topByUser.map(top => <option key={top.id} value={top.id}>{top.name}</option>)
                                        }
                                    </select>
                                </label>
                            </div>

                            <input
                                type='submit'
                                value='Submit'
                                className='btn btn-primary'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
