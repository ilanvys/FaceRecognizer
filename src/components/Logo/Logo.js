import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain-logo.png'
import './Logo.css'


const Logo = () => {
  return (
    <div className='h4 w4 ma4 mt5'>
      <Tilt className='wrapper' >
        <div className='wrapper br2 shadow-2 pa3' >
          <img alt='Face Recognizer' src={brain} />
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;
