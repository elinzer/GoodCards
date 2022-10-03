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
    sessionLinks = (
    <div>
      <button>Profile</button>
      <li>
          <LogoutButton />
        </li>
    </div>)
  } else {
    sessionLinks = (
      <div>
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
      </ul>
    </nav>
  );
}

export default NavBar;
