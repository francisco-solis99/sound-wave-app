import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/pages/login-sign.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import AnimatedComponent from '../components/AnimatedComponent';
import { Alert } from '@mui/material';
import Collapse from '@mui/material/Collapse';

import { signUp } from '../services/auth/auth';


export default function SignUp() {
  const navigate = useNavigate();
  const email = useRef('');
  const password = useRef('');
  const name = useRef('');
  const surname = useRef('');
  const nickName = useRef('');
  const confirmPassword = useRef('');

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severityClass, setSeverityClass] = useState('info');

  const cleanFields = () => {
    name.current.value = '';
    surname.current.value = '';
    nickName.current.value = '';
    email.current.value = '';
    password.current.value = '';
    confirmPassword.current.value = '';
  };

  const launchAlert = (msg, severityValue) => {
    setMessage(msg);
    setSeverityClass(severityValue);
    setAlert(true);
  };

  const handlerSignUp = () => {
    if (password.current.value !== confirmPassword.current.value) {
      setAlert(true);
      setMessage('Password do not match');

      setTimeout(() => {
        setAlert(false);
      }, 2000);
    };

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
        if (!ok) return Promise.reject(result.message);
        launchAlert(result.message, 'success');
        setTimeout(() => {
          setAlert(false);
          setMessage('');
          setSeverityClass('');
          navigate('/login');
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
        cleanFields();
      });

  };


  return (
    <AnimatedComponent>
      <Collapse in={alert}>
        <Alert severity={severityClass}>{message}</Alert>
      </Collapse>
      <main className='Initial__page SignUp'>
        <div className='Initial__background'></div>
        <Form callbackSubmit={handlerSignUp}>
          <h1 className="Title" >
            <Link to='/'>Soundwave</Link>
          </h1>
          <h2 className="Subtitle">Welcome!</h2>
          <Input type="text" placeholder="name" ref={name} required />
          <Input type="text" placeholder="surname" ref={surname} required />
          <Input type="text" placeholder="nickname" ref={nickName} required />
          <Input type="email" placeholder='example@gmail.com' ref={email} required />
          <Input type="password" placeholder='password' ref={password} required />
          <Input type="password" placeholder='confirm password' ref={confirmPassword} required />
          <Button typeStyle="primary" type="submit">SIGN UP</Button>
          <p className="Last__line">
            Already a user?
            <Link to="/login" className="link-to"><strong> Login</strong></Link>
          </p>
        </Form>
      </main>
    </AnimatedComponent>
  );
}
