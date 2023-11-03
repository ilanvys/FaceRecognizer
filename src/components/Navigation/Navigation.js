import React from 'react';
import './Navigation.css';


const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className='nav-wrapper pointer signout'>
        <p 
          className='f3 link dim black pr3 pl3 pointer'
          onClick={() => onRouteChange('Sign Out')}
        >
        Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav>
        <p 
          className='nav-wrapper f3 black pa3 pointer'
          onClick={() => onRouteChange('Sign In')}
        >
        Sign In
        </p>
        <p 
          className='nav-wrapper f3 black pa3 pointer'
          onClick={() => onRouteChange('Register')}
        >
        Register
        </p>
      </nav>
    );
  }
}

export default Navigation;
