import React, { useState, useEffect } from 'react';
import '../styles/pages/dashboard.css';
import Loader from '../components/Loader';
import ModalTop from '../components/ModalTop';
import { getSongsTops } from '../services/topSongs/topSongs';
import ModalCreate from '../components/ModalCreate';

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
          <ModalCreate />
          <button className='btn artist-btn' data-bs-toggle="modal" data-bs-target="#modalCreate">CREATE</button>
          <h2 className="Home__title-section">Tops</h2>
          {
            !isLoading ? topSongs.map(top => <button className='btn artist-btn' data-bs-toggle="modal" data-bs-target="#modalTop" onClick={() => { setModalTopData(top); }}>{top.name}</button>) : <Loader />
          }
          <ModalTop topData={modalTopData} />
        </div>
      </section>
    </div>

// import React, { useEffect } from 'react';
// import { useState } from 'react';

// import Top from '../components/Top';
// import { getTopsByUser } from '../services/tops/tops';



// export default function Dashboard() {

//   const [topsUser, setTopsUser] = useState([]);

//   useEffect(() => {

//     getTopsByUser(2).then(tops => setTopsUser(tops)).catch(err => console.log(err));

//   }, []);


//   return (
//     <main className="Dashboard">
//       <h2>Dashboard</h2>
//       {
//         topsUser.map(top => <Top key={top.id} top={top} />)
//       }
//     </main>
//   );
// }
