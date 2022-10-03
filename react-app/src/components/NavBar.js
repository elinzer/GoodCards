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
          <button>My decks</button>
          </div>
        <div>
          <ProfileButton user={sessionUser}/>
          </div>
      </div>)
  } else {
    sessionLinks = null
  }


  return (
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
  );
}

export default NavBar;
