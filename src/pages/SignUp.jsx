import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/signup.css';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';


export default function SignUp() {
  return (
    <main className='SignUp__page'>
      <div className='SignUp__background'></div>
      <Form>
        <h1 className="SignUp__title" >Soundwave</h1>
        <h2 className="SignUp__subtitle">Welcome!</h2>
        <Input type='text' placeholder='example@gmail.com' />
        <Input type='password' placeholder='Password' />
        <Input type='text' placeholder='Confirm password' /><br></br>
        <Button type="secundary">SIGN UP</Button>
        <p className="Last__line2">
          Already a user?
          <Link to="/login"><strong>Login</strong></Link>
        </p>
      </Form>
    </main>
  );
}
