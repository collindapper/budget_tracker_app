// layout.js
import React from 'react';
import { safeCredentials, handleErrors } from './utils/fetchHelper';

// Importing stylesheet
import './layout.scss';

class Layout extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      username: '',
      navbarOpen: false,
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

  toggleNavbarOpen = () => {
    this.setState({
      navbarOpen: !this.state.navbarOpen,
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
    const { authenticated, username, navbarOpen } = this.state;

    return (
      <React.Fragment>
        <div className="d-flex content">

            <nav className={`d-flex align-content-between navbar ${(navbarOpen && "col-4 col-sm-2") || (!navbarOpen && "col-2 col-sm-1")}`} id="navbar">
                <div className="mx-auto w-100">
                  <button className="hamburger-toggle mx-auto w-100" onClick={this.toggleNavbarOpen}>
                    <span className={`hamburger hamburger-icon ${navbarOpen && "is-open"}`}></span>
                  </button>
                  <a href="/"><div className="logo w-100"></div></a>
                </div>

                  {(navbarOpen)
                    
                  ? <div className="d-flex container">
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-chart-line text-success me-2"></i>Overview</a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-piggy-bank text-success me-2"></i>Savings</a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-file-invoice-dollar text-success me-2"></i>Tracker</a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-comments-dollar text-success me-2"></i>Notes</a>
                    </div>

                  : <div className="d-flex container">
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-chart-line text-success me-2"></i></a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-piggy-bank text-success me-2"></i></a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-file-invoice-dollar text-success me-2"></i></a>
                      <a className="navbar-brand w-100 mx-auto text-center text-white my-2" href="/"><i className="fas fa-comments-dollar text-success me-2"></i></a>
                    </div>
                  
                  }
                   
                  {(authenticated)
                  
                  ? <a className="btn btn-outline-success w-75 mx-4 btn-logout mx-auto" onClick={this.logout}><i className="fas fa-sign-out-alt"></i></a>
                  : <a className="btn btn-outline-success w-75 mx-4 btn-login mx-auto" href="/login"><i className="fas fa-sign-in-alt"></i></a>
                  }
                
                
              </nav>
            

          <div className="d-flex container col-9 col-sm-10 mainContent">
            {this.props.children}
          </div>
        
        {/*
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
          </footer>*/}
        </div>
      </React.Fragment>
    );
  }
}

export default Layout;