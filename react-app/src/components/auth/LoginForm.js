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
        <form onSubmit={onLogin} className='login-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className='error-spot'>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email' className='login-label'>Email</label>
            <input
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
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
            <div className='login-button-div'>
              <button type='submit'>Login</button>
            </div>
          </div>
        </form>
        <div>
          Need to sign up?
          <NavLink to='/sign-up'>Sign up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
