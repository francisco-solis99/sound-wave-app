import React, { useState, useEffect } from 'react';
import '../styles/components/topslider.css';
import { Slider } from '@mui/material';
import TopSongs from './TopSongs';

export default function TopSlider({ topData }) {

  const [topSong, setTopSong] = useState({});

  useEffect(() => {
    setTopSong(topData[0]);
    let marks = [];
    topData.map(top => marks.push({ value: top.id, label: top.name }));
  }, []);

  const handleOnChange = (value) => {
    const top = topData.filter(top => top.id === value);
    setTopSong(top[0]);
  };

  return (
    <div>
      <div className='TopSlider__container'>
        <Slider
          color='secondary'
          defaultValue={0}
          aria-labelledby="discrete-slider-always"
          step={1}
          marks={false}
          min={1}
          max={topData.length}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </div>
      {
        Object.keys(topSong).length !== 0 ? <TopSongs key={topSong.id} topData={topSong} /> : <h1>Adios</h1>
      }
    </div>
  );
}
