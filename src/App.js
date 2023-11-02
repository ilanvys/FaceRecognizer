import React, { Component } from 'react';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Form from './components/Form/Form';
import './App.css';
import ParticlesBg from 'particles-bg'


// TODO: Fix Registration in sign out V
// TODO: Update Readme V
// TODO: Update title and icon V
// TODO: update repo name
// TODO: Fix Image messages if theres an error
// TODO: Add a list to image recogintion
// TODO: Make the design cleaner

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'Sign In',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    console.log(process.env.REACT_APP_API_URL)
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

  onRouteChange = (route) => {
    if (route === 'Sign Out') {
      this.setState(initialState);
      return;
    }
    else if (route === 'Home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  calcFaceLocation = (data) => {
    const image = document.getElementById('input-image');
    const clarifyFace = data.faceModelResponse[0].region_info.bounding_box;
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
    fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
    .then(response => response.json())
    .then(data => {
      if (data) {
        fetch(`${process.env.REACT_APP_API_URL}/image`,{ 
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
        .catch(console.log);
        this.displayBox(this.calcFaceLocation(data));
      }
    })
    .catch(err => console.log(err)); //TODO: inform the user
  }

  render () {
    const { route, isSignedIn,imageUrl, box, user } = this.state;
    return (
      <div className='App'>
        <ParticlesBg  type='cobweb' bg={true} blur={5} color='#c2fff1'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'Home' ? 
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm 
              onPictureSubmit={this.onPictureSubmit} 
              onInputChange={this.onInputChange} 
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div> :
          <Form mode={route} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}
 
export default App;
