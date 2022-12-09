import React, {useState, useEffect} from 'react';
import '../styles/pages/dashboard.css';
import Loader from '../components/Loader';
import ModalTop from '../components/ModalTop';
import { getSongsTops } from '../services/topSongs/topSongs';

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const [topSongs, setTopSongs] = useState([]); 
  const [modalTopData, setModalTopData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getSongsTops()
        .then(data => {
          setTopSongs(data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    }, 200);

  }, []);

  return (
    <div className='Dashboard__main'>

    <h2>Dashboard</h2>

    <section className="section Home__tops">
    <div className="container">
      <h2 className="Home__title-section">Tops</h2>
      {
        !isLoading ? topSongs.map(top => <button className='btn artist-btn' data-bs-toggle="modal" data-bs-target="#modalTop" onClick={() => { setModalTopData(top); }}>{top.name}</button>) : <Loader />
      }
      <ModalTop topData={modalTopData}/>
    </div>
  </section>
    </div>

  );
}
