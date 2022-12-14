import React, { forwardRef } from 'react';
import '../styles/components/input.css';

const Input = forwardRef((props, ref) => {
  return (
    <input className="Input" type={props.type} placeholder={props.placeholder} ref={ref} onChange={props.onChange} />
  );
});

export default Input;
