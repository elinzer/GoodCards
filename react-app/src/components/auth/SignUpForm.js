import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [hasSubmitted, setHasSubmitted] = useState(false)

  let errs = [];

  useEffect(() => {
    if (email.length < 3 || email.indexOf('@') !== email.lastIndexOf('@') || !(email.includes('.com') || email.includes('.co') || email.includes('.io') || email.includes('.net'))) errs.push('Email must be valid email');
    if (repeatPassword != password) errs.push('Passwords must match')
    if (username.length > 20) {
      errs.push('Username cannot be greater than 20 characters')
    }
    if (errs.length) {
      setErrors(errs)
    } else {
      setErrors([])
    }
  }, [email, repeatPassword, username])


  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors?.length) {
      return
    } else {
      const data = await dispatch(signUp(username, email, password));
      if (data || data?.errors) {
        setErrors([...data])
      } else {
        setHasSubmitted(false);
        setErrors([]);
      }
    }
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-form-container'>
      <div className='form-n-link'>
        <div>Sign Up</div>
        <form onSubmit={onSignUp} className='signup-form'>
          <div className='signup-errors'>
            {hasSubmitted && errors.map((error, ind) => {
              console.log(error)
              return (
                <div className='error-lis' key={ind}>{error}</div>
              )
            })}
          </div>
          <div className='name-div'>
            <label>User Name</label>
            <input
              className='sign-input'
              placeholder='Username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className='email-div'>
            <label>Email</label>
            <input
              className='sign-input'
              placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className='password-div'>
            <label>Password</label>
            <input
              className='sign-input'
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className='repeat-div'>
            <label>Repeat Password</label>
            <input
              className='sign-input'
              placeholder='Repeat Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='button-div'>
            <button className='signup-button' type='submit'>Sign Up</button>
          </div>
        </form>
        <div>
          Already have an account?
          <NavLink className='to-log' to='/login'>Sign in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
