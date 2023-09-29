import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';

import './home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProjects: [],
    }
  }

  render () {
    return (
      <Layout>
        <div>
          <h1>Budget Tracker App Testing</h1>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
