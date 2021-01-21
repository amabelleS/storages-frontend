import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth/Auth-context';

// import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

export const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && auth.name && (
        <li>
          <NavLink to={`/userInfo/${auth.userId}`} exact>
            {auth.name.toUpperCase()}'S ITEMS RESERVED
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/storages/new">NEW</NavLink>
        </li>
      )}
      <li>{/* <NavLink to={`/:${sid}/update`}>Update</NavLink> */}</li>
      {/* <NavLink to="/">MY STORAGE</NavLink> */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">
            <i className="fas fa-key"></i> AUTHENTICATE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
