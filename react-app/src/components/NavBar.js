import navLogo from '../images/navLogo.png'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='nav-list'>
        <div>
          <NavLink to='/my-decks'><button className='my-decks-button'>My Decks</button></NavLink>
        </div>
          <ProfileButton user={sessionUser} />
      </div>)
  } else {
    sessionLinks = (
      <div className='nav-list'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button className='login-nav'>Log in</button>
          </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          <button className='signup-nav'>Sign Up</button>
        </NavLink>
      </div>
    )
  }


  return (
    <div className='outer-nav'>
    <nav className='nav-container'>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img style={{ maxHeight: '70px' }} src={navLogo} />
        </NavLink>
      </div>
      <div>
        {sessionLinks}
      </div>


    </nav>
    </div>
  );
}

export default NavBar;
