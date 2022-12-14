import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { signUp } from '../services/auth/auth';


export default function SignUp() {
  const navigate = useNavigate();
  const email = useRef('');
  const password = useRef('');
  const name = useRef('');
  const surname = useRef('');
  const nickName = useRef('');
  const confirmPassword = useRef('');
  const [error, setError] = useState('');

  const cleanFields = () => {
    name.current.value = '';
    surname.current.value = '';
    nickName.current.value = '';
    email.current.value = '';
    password.current.value = '';
    confirmPassword.current.value = '';
  };

  const handlerSignUp = () => {
    if (password.current.value !== confirmPassword.current.value) return;

    const newUser = {
      name: name.current.value,
      surname: surname.current.value,
      nickName: nickName.current.value,
      email: email.current.value,
      password: password.current.value,
      typeuserId: 2
    };

    signUp(newUser)
      .then(response => {
        const { ok, result } = response;
        if (!ok) throw new Error(result.message);
        console.log(response);
        navigate('/login');
      })
      .catch(err => {
        setError(err.message);
        console.log(error);
      })
      .finally(() => {
        cleanFields();
      });

  };


  return (
    <main className='Initial__page SignUp'>
      <div className='Initial__background'></div>
      <Form callbackSubmit={handlerSignUp}>
        <h1 className="Title" >
          <Link to='/'>Soundwave</Link>
        </h1>
        <h2 className="Subtitle">Welcome!</h2>
        <Input type="text" placeholder="name" ref={name} />
        <Input type="text" placeholder="surname" ref={surname} />
        <Input type="text" placeholder="nickname" ref={nickName} />
        <Input type="email" placeholder='example@gmail.com' ref={email} />
        <Input type="password" placeholder='password' ref={password} />
        <Input type="password" placeholder='confirm password' ref={confirmPassword} />
        <Button typeStyle="primary" type="submit">SIGN UP</Button>
        <p className="Last__line">
          Already a user?
          <Link to="/login" className="link-to"><strong> Login</strong></Link>
        </p>
      </Form>
    </main>
  );
}
