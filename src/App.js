import React, { Component } from 'react';

import config from './config.json';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import ParticlesBg from 'particles-bg'


const clarifyRequestOptions = (imageUrl) => {
  const PAT = config.CLARIFY_API_KEY;
  const USER_ID = 'ilanvys';       
  const APP_ID = 'facerecognizer';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  return requestOptions;

}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  calcFaceLocation = (data) => {
    const image = document.getElementById('input-image');
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
      clarifyRequestOptions(this.state.input))
    .then(response => response.json())
    .then(result => {
      this.displayBox(this.calcFaceLocation(result));
    })
    .catch(err => console.log(err));
  }

  render () {
    const { route, isSignedIn,imageUrl, box } = this.state;
    return (
      <div className='App'>
        <ParticlesBg  type='cobweb' bg={true} blur={5} color='#a0d6eb'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onSubmit={this.onSubmit} 
              onInputChange={this.onInputChange} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> 
          : (route === 'signin') ? 
            <SignIn onRouteChange={this.onRouteChange} /> :
            <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}
 
export default App;
