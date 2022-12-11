import React from 'react';

export default function Input(props) {
  return (
    <input className="Input" type={props.type} placeholder={props.placeholder} />
  );
};
