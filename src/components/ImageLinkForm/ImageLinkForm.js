import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ input, errorMessage, onInputChange, onPictureSubmit }) => {
  return (
    <div>
        <div className='center'>
          <div className='center form pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='text' value={input} onChange={onInputChange}/>
            <button 
              className='w-30 grow f4 link ph3 pv2 dib whit bg-light-purple'
              onClick={onPictureSubmit}
            >
            Detect
            </button>
          </div>
        </div>
        <div className='center'>
          <small id="password-desc" className="f3 lh-copy black-60 db mb2 red">
              {errorMessage}
          </small>
        </div>
    </div>
  )
}

export default ImageLinkForm;