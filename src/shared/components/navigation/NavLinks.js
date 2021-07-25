import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../../../context/auth/Auth-context';

import './NavLinks.css';

export const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {auth.isLoggedIn && auth.name && (
        <li className="nav_actions">
          <NavLink 
          to={`/userInfo/${auth.userId}`} 
          exact
          activeClassName="active"
          >
            {auth.name.toUpperCase()}'s Reserved
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="nav_actions">
          <NavLink activeClassName="active" to="/storages/new">New</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li className="nav_actions">
          <NavLink activeClassName="active" to="/auth">
            <i className="fas fa-key"></i>
            <span> Sigh In </span>
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li className="nav_actions" onClick={auth.logout}>
        <Link to="#">Logout</Link>
      </li>
      )}
    </ul>
  );
};

export default NavLinks;
