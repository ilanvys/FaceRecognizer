import React, { Component } from 'react';

import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Form from './components/Form/Form';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ParticlesBg from 'particles-bg';
import Rank from './components/Rank/Rank';


const initialState = {
  input: '',
  imageUrl: '',
  imageHeight: '',
  errorMessage: '',
  boxes: [],
  items: [],
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
    const imageWidth = image.width;
    const imageHeight = image.height;
    this.setState({ imageHeight: imageHeight });
    
    const boundingBoxes = data.map(face => {
      const clarifyFace = face.region_info.bounding_box;
      return {
        leftCol: clarifyFace.left_col * imageWidth,
        topRow: clarifyFace.top_row * imageHeight,
        rightCol: imageWidth - clarifyFace.right_col * imageWidth,
        bottomRow: imageHeight - clarifyFace.bottom_row * imageHeight
      };
    });
  
    return boundingBoxes;
  };

  displayBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  }

  displayItems = (items) => {
    this.setState({ items: items });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = (event) => {
    if (!this.state.input) {
      this.setState({ errorMessage: 'Missing Image URL' });
      return;
    }

    this.setState({ 
      imageUrl: this.state.input,
      errorMessage: '',
      boxes: [],
      items: ''
    });
    
    fetch(`${process.env.REACT_APP_API_URL}/imageurl`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input: this.state.input })
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        fetch(`${process.env.REACT_APP_API_URL}/image`, { 
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id })
        })
        .then(resp => resp.json())
        .then(count => {
          if (isNaN(count)) {
            this.setState({ errorMessage: `Error occurred. Couldn't update entries count.` });
          } else {
            this.setState(prevState => {
              return {
                user: {
                  ...prevState.user,
                  entries: count
                },
                input: ''
              };
            });
          }
        })
        .catch(err => {
          this.setState({ errorMessage: `Error occurred. Couldn't update entries count.` });
        });
        this.displayBoxes(this.calcFaceLocation(data.faceModelResponse));
        this.displayItems(data.imageRecognitionResponse);
      }
    })
    .catch(err => {
      this.setState({ errorMessage: `Error occurred. Couldn't analyze image` });
    });
  }

  render () {
    const {
      route,
      isSignedIn,
      imageUrl,
      imageHeight,
      boxes,
      items,
      user,
      input,
      errorMessage,
    } = this.state;

    return (
      <div className='App'>
        <ParticlesBg  type='cobweb' bg={true} blur={5} color='#c2fff1'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'Home' ? 
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                errorMessage={errorMessage}
                input={input}
                onPictureSubmit={this.onPictureSubmit}
                onInputChange={this.onInputChange}
              />
              <ImageRecognition items={items} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} imageHeight={imageHeight} />
          </div> :
          <Form mode={route} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}
 
export default App;
