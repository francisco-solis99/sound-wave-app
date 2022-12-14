import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';

import { login, setToken } from '../services/auth/auth';

export default function Login({ handlerChangeUser }) {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState('');

  const handlerLogin = () => {
    const credentials = {
      email: email.current.value,
      password: password.current.value,
    };

    login(credentials)
      .then(response => {
        const { ok, user } = response;
        if (!ok) throw new Error(user.message);
        console.log('succesfully');
        window.localStorage.setItem('loggedSoundwaveApp', JSON.stringify(user));
        setToken(user.token);
        handlerChangeUser(user);
        navigate('/dashboard');
      })
      .catch(err => {
        setError(err.message);
        console.log(error);
      })
      .finally(() => {
        email.current.value = '';
        password.current.value = '';
      });
  };


  return (
    <main className='Initial__page'>
      <div className='Initial__background'></div>
      <Form callbackSubmit={handlerLogin}>
        <h1 className="Title" >
          <Link to='/'>Soundwave</Link>
        </h1>
        <h2 className="Subtitle">Welcome back!</h2>
        <Input type="email" placeholder="example@gmail.com" ref={email} />
        <Input type="password" placeholder="password" ref={password} />
        <Button typeStyle="primary" type="submit">LOGIN</Button>
        <p className="Last__line">
          New user?
          <Link to="/signup" className="link-to "><strong> Sign up</strong></Link>
        </p>
      </Form>
    </main>
  );
}
