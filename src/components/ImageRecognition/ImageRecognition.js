import React from 'react';
import './ImageRecognition.css'


const ImageRecognition = ({ items }) => {
  return (
    (items.length > 0) && (
      <div className='items-wrapper center ma shadow-5 w-50 br2 mt3-ns white'>
        {items.map((item, index) => (
          <div 
            key={item}
            className='mt2 f3 pr3-ns'
          >
            {`${item}${index !== items.length - 1 ? ', ' : ''}`}
          </div>
          ))
        }
      </div>
    )
  )
}

export default ImageRecognition;
