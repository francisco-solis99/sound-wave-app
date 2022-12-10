import React, { useEffect } from 'react';
import { useState } from 'react';

import Top from '../components/Top';
import { getTopsByUser } from '../services/tops/tops';



export default function Dashboard() {

  const [topsUser, setTopsUser] = useState([]);

  useEffect(() => {

    getTopsByUser(2).then(tops => setTopsUser(tops)).catch(err => console.log(err));

  }, []);


  return (
    <main className="Dashboard">
      <h2>Dashboard</h2>
      {
        topsUser.map(top => <Top key={top.id} top={top} />)
      }
    </main>
  );
}
