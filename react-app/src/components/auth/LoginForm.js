import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    dispatch(login('demo@aa.io', 'password'))
  }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <div className='form-and-link'>
        <div className='log-in-head'>Log In</div>
        <form onSubmit={onLogin} className='login-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className='error-spot'>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email' className='login-label'>Email</label>
            <input
              className='login-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
            />
          </div>
          <div>
            <label htmlFor='password' className='login-label'>Password</label>
            <input
              className='login-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
            <div className='login-button-div'>
              <button className='login-button' type='submit'>Login</button>
            </div>
          </div>
        </form>
        <div>
        <button onClick={demoLogin} className='demo-button'>Demo Login</button>
        </div>
        <div className='link-div'>
          Don't have an account?
          <NavLink className='to-sign' to='/sign-up'>Sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
