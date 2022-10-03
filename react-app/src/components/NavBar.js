import navLogo from '../images/navLogo.png'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = <button>Profile</button>
  } else {
    sessionLinks = (
      <div>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </div>
    )
  }


  return (
    <nav className='nav-container'>
      <ul className='nav-list'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img style={{ maxHeight: '70px' }} src={navLogo} />
          </NavLink>
        </li>
        {sessionLinks}
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
