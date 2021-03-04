import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../context/auth/Auth-context';

import './NavLinks.css';

export const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && auth.name && (
        <li className="nav_actions">
          <NavLink to={`/userInfo/${auth.userId}`} exact>
            {auth.name.toUpperCase()}'S ITEMS RESERVED
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="nav_actions">
          <NavLink to="/storages/new">NEW</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li className="nav_actions">
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
