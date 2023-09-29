// layout.js
import React from 'react';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

// Importing stylesheet
import './home.scss';

class Layout extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      username: '',
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        // console.log(data)
        this.setState({
          authenticated: data.authenticated,
          username: data.username,
        })
      })
  }

  logout = (e) => {
    e.preventDefault();

    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        //console.log('data', data)
        if (data.success) {
          this.setState({
            authenticated: false,
          })
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not sign out.',
        })
      })
  }

  render () {
    const { authenticated, username } = this.state;

    return (
      <React.Fragment>
          {(authenticated)

            ? <nav className="navbar navbar-expand d-flex px-md-5 px-2" id="navbar">
                <a className="navbar-brand text-success" href="/">
                  <b className="d-md-inline d-none">Budget Buddy</b>
                </a>
                <button type="submit" className="btn btn-outline-success btn-logout" onClick={this.logout}>Log out @{username}</button>
              </nav>

            : <nav className="navbar navbar-expand d-flex justify-content-between px-md-5 px-2" id="navbar">
                <a className="navbar-brand text-success" href="/">
                  
                  <b className="pl-2" >Budget Buddy</b>
                </a>
                <a className="btn btn-outline-success btn-login" href="/login">Log in</a>
              </nav>
          }
        <div className="content">
          {this.props.children}
        </div>
        
        {/* Footer */}
        <footer>
          <div className="container">
            <div className="row no-gutters justify-content-between py-4 footerBar">
              <div className="col-12 col-xl-auto order-2 order-xl-1">
                  <div className="d-xl-flex text-left text-md-center">
                    <span className="d-block">© 2023 Collin Dapper, Inc. All rights reserved</span>
                  </div>
              </div>
              
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;