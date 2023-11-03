import React, { Component } from 'react';
import './Form.css'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      errorMessage: '',
      nameBox: '',
      emailBox: '',
      passwordBox: ''
    }
  }

  onFieldChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value});
  }

  onSubmit = (endpoint, data) => {
    fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.id) {
        this.props.loadUser(data);
        this.props.onRouteChange('Home');
      } else {
        this.setState({ errorMessage: data });
      }
    })
    .catch(err => {
      this.setState({ errorMessage: `Error occurred during ${this.state.mode}` });
    });
  }

  onSubmitRegister = () => {
    const registration = {
      name: this.state.nameBox,
      email: this.state.emailBox,
      password: this.state.passwordBox
    }

    if (!registration.name || !registration.email || !registration.password) {
      this.setState({ errorMessage: 'Missing credentials' });
      return;
    }

    this.onSubmit('register', registration);
  }

  onSubmitSignIn = () => {
    const signIn = {
      email: this.state.emailBox,
      password: this.state.passwordBox
    }

    if (!signIn.email || !signIn.password) {
      this.setState({ errorMessage: 'Missing credentials' });
      return;
    }

    this.onSubmit('signin', signIn);
  }

  render () {
    const { mode, onRouteChange } = this.props;
    return (
      <article className="form-wrapper br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-30-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">{mode}</legend>
              {mode === 'Register' && 
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                  <input 
                    className="pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name" 
                    onChange={(e) => this.onFieldChange(e, 'nameBox')}
                  />
                </div>}

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email"
                  name="email-address" 
                  id="email-address" 
                  onChange={(e) => this.onFieldChange(e, 'emailBox')}
                />
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                  onChange={(e) => this.onFieldChange(e, 'passwordBox')}
                />
              </div>

            </fieldset>
            <small id="password-desc" className="f5 lh-copy black-60 db mb2 red">
              {this.state.errorMessage}
            </small>
            <div className="">
              <input 
                onClick={() => {
                  if (mode === 'Register') {
                    this.onSubmitRegister();
                  } else {
                    this.onSubmitSignIn();
                  }
                }}
                className="b ph3 pv2 br2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value={mode} 
              />
            </div>
            {mode === 'Sign In' &&
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('Register')} href="#0" className="f6 link dim black db pointer">Register</p>
              </div>}
          </div>
        </main>
      </article>
    )
  }
}

export default Register;
