import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div>
        <p className='f3'>This magic brain can describe images.</p>
        <p className='f3'>If the image contains faces, it will recognize them.</p>
        <p className='f3'>Give it a try.</p>
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
