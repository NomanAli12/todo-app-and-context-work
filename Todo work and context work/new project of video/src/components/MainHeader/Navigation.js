import React ,{ useContext } from 'react';
import classes from './Navigation.module.css';
import AuthContext from '../../context/authContext';



const Navigation = (props) => {
    
 const contxt =  useContext(AuthContext)
   
  return (
    <nav className={classes.nav}>
      <ul>
        {contxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {contxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {contxt.isLoggedIn && (
          <li>
            <button onClick={contxt.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
