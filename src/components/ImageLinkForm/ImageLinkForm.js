import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ input, errorMessage, onInputChange, onPictureSubmit }) => {
  return (
    <div className='image-link-wrapper br2 mt2 center shadow-5 w-70 br2'>
        <div className='center br2 w-100'>
          <div className='center pa4 br2 w-100'>
            <input className='f4 pa2 br2 w-70 center' type='text' value={input} onChange={onInputChange}/>
            <button 
              className='w-30 grow f3 ml2 link br2 ph3 pv2 dib white bg-transparent'
              onClick={onPictureSubmit}
            >
            Detect
            </button>
          </div>
        </div>
        {errorMessage && <div className='center'>
          <small id="password-desc" className="f3 lh-copy black-60 db mb2 red">
              {errorMessage}
          </small>
        </div>}
    </div>
  )
}

export default ImageLinkForm;