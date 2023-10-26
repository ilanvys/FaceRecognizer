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
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then(console.log)
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

  onPictureSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
      clarifyRequestOptions(this.state.input))
    .then(response => response.json())
    .then(data => {
      if (data) {
        fetch('http://localhost:3000/image',{ 
          method: 'put',
          
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(resp => resp.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
        })
        this.displayBox(this.calcFaceLocation(data));
      }
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm 
              onPictureSubmit={this.onPictureSubmit} 
              onInputChange={this.onInputChange} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> 
          : (route === 'signin') ? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}
 
export default App;
