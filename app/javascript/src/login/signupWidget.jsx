// signupWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class SignupWidget extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  signup = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        console.log('data')
        this.login();
      })
      .catch(error => {
        this.setState({
          error: 'Could not sign up',
        })
        console.log('catch error');
      })
  }

  login = (e) => {
    if (e) { e.preventDefault(); }
    this.setState({
      error: '',
    });

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        }
      })
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log in.',
        })
      })
  }


  render () {
    const { email, password, error } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.signup}>
          <input name="email" type="text" className="form-control form-control-lg mb-3" placeholder="Email" value={email} onChange={this.handleChange} required />
          <input name="password" type="password" className="form-control form-control-lg mb-3" placeholder="Password" value={password} onChange={this.handleChange} required />
          <div className="container">  
            <p className="mb-0">Password requirements:</p>
            <p className="mb-0">- Minimum of 8 characters.</p>
            <p>- Must contain special characters. Ex. "!@#$%"</p>
          </div>
          

          <button type="submit" className="btn btn-success btn-lg w-100">Sign up</button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <hr/>
        <p className="mb-0">Already have an account? <a className="text-primary btn pt-0" onClick={this.props.toggle}>Log in</a></p>
      </React.Fragment>
    )
  }
}

export default SignupWidget