import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button className='logout-button' onClick={onLogout}>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>;
};

export default LogoutButton;
