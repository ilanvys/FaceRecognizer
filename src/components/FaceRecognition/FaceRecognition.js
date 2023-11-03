import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageHeight, boxes, imageUrl }) => {
  return (
    imageUrl && (
      <div 
        className='center ma image-wrapper shadow-5 w-50 br2 mt3-ns white' 
        style={{height: `${imageHeight + 30}px`}}
      >
        <div className='absolute mt2 mb4'>
        {imageUrl && (
          <img
            id='input-image'
            alt='img'
            src={imageUrl}
            width='500px'
            height='auto'
          />
          )}
        {boxes.map((box, index) => <div 
            key={index}
            className='bounding-box'
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          ></div>)}
        </div>
      </div>
    )
  )
}

export default FaceRecognition;
