import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav className='signout'>
          <p 
            className='nav-wrapper f3 link dim black pa3 pointer'
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
