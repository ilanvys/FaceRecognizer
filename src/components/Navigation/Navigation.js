import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav>
          <p 
            className='f3 link dim black underline pa3 pointer'
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
            className='f3 link dim black underline pa3 pointer'
            onClick={() => onRouteChange('Sign In')}
          >
          Sign In
          </p>
          <p 
            className='f3 link dim black underline pa3 pointer'
            onClick={() => onRouteChange('Register')}
          >
          Register
          </p>
        </nav>
      );
    }
}

export default Navigation;
