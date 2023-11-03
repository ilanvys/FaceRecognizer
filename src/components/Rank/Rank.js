import React from 'react';
import './Rank.css';


const Rank = ({ name, entries }) => {
  return (
    <div className='rank-wrapper'>
      <div>
        <p className='f3'>This magic brain can describe images.</p>
        <p className='f3'>If the image contains faces, it will recognize them.</p>
      </div>
      <div className='white f3 '>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {`#${entries}`}
      </div>
    </div>
  )
}

export default Rank;
