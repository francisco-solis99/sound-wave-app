import React from 'react';
import '../styles/components/input.css';

export default function Input(props) {
  return (
    <input className="Input" type={props.type} placeholder={props.placeholder} />
  );
};
