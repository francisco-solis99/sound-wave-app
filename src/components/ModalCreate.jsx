import React from 'react';
import { useState } from 'react';
import '../styles/components/modals.css';

const options = {
    'top': ['Name: ', 'Description: '],
    'genre': ['Name: '],
    'song': ['Name: ', 'Year: ', 'linkYT: ', 'ArtistId: ', 'GenreId: '],
    'artist': ['Name: ', 'Country: ', 'Youtube: '],
};

function Input(props) {
    return (
        <div className='modal-input'>
            <label className='modal-label'>{props.label}</label>
            <input></input>
        </div>
    );
};

export default function ModalCreate(props) {
    const [option, setOption] = useState('');

    return (
        <div className="modal fade" id="modalCreate" tabIndex={-1} aria-labelledby="modalCreateLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title" id="modalCreateLabel">Create</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form>

                            <p><span className='modal-label'>New: </span>
                                <select name="select" onChange={e => setOption(e.target.value)}>
                                    <option value="">Select an option</option>
                                    <option value="top">Top</option>
                                    <option value="genre">Genre</option>
                                    <option value="song">Song</option>
                                    <option value="artist">Artist</option>
                                </select>
                            </p>

                            {option !== '' &&
                                <div>
                                    <p>Okay! Let's create a new {option}. Please provide the following: </p>
                                    {
                                        options[option].map(label =>
                                            <Input label={label} />
                                        )
                                    }
                                </div>
                            }
                        </form>
                    </div>

                    <div className="modal-footer">
                        {/* Add buttons styles */}
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {option === '' && <button type="button" className="btn btn-primary" disabled>Save</button>}
                        {option !== '' && <button type="button" className="btn btn-primary">Save</button>}
                    </div>

                </div>
            </div>
        </div>
    );
};
