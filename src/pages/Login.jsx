import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import AnimatedComponent from '../components/AnimatedComponent';
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';

import { login, setToken } from '../services/auth/auth';

export default function Login({ handlerChangeUser }) {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityClass, setSeverityClass] = useState('info');


  const launchAlert = (msg, severityValue) => {
    setMessage(msg);
    setSeverityClass(severityValue);
    setAlert(true);
  };

  const handlerLogin = () => {
    const credentials = {
      email: email.current.value,
      password: password.current.value,
    };

    login(credentials)
      .then(response => {
        const { ok, user } = response;
        if (!ok) return Promise.reject(new Error(user.message));
        console.log('succesfully');
        launchAlert(user.message, 'success');
        window.localStorage.setItem('loggedSoundwaveApp', JSON.stringify(user));
        setToken(user.token);
        handlerChangeUser(user);
        setTimeout(() => {
          setAlert(false);
          setMessage('');
          setSeverityClass('');
          navigate('/dashboard');
        }, 1500);
      })
      .catch(err => {
        launchAlert(err.message, 'error');
        setTimeout(() => {
          setAlert(false);
          setMessage('');
          setSeverityClass('');
        }, 2000);
      })
      .finally(() => {
        email.current.value = '';
        password.current.value = '';
      });
  };


  return (
    <AnimatedComponent>

      <Collapse in={alert}>
        <Alert severity={severityClass}>{message}</Alert>
      </Collapse>

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
    </AnimatedComponent>
  );
}
