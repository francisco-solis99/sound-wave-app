import React from 'react';
import { Slider } from '@mui/material';

export default function TopSlider() {
  return (
    <Slider
      defaultValue={1}
      aria-labelledby="discrete-slider-always"
      step={1}
      marks={true}
      min={1}
      max={3}
      valueLabelDisplay="on"
    />
  );
}
