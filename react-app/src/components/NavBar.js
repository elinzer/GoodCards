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
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>)
  } else {
    sessionLinks = (
      <div className='nav-list'>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
           <button>Log in</button>
          </NavLink>
        </div>
        <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    <button>Sign Up</button>
                </NavLink>
        </div>
      </div>
    )
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
