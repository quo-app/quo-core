import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const Logo = () => (
  <svg>Q</svg>
);

export default class Landing extends Component {
  render () {
    return (
      <div id='quo-homepage'>
        <nav>
          <Logo/>
          <div className='center'>
            <span>Start</span>
            <span>Learn</span>
          </div>
        </nav>
        <main>
          <h1> Enter a new <br/> world </h1>
          <div class='subheading'> Say hello to the digital design space where the only limit is your imagination. </div>
          <button>
            <Link to='/projects'> Try the Quo Sandbox</Link>
          </button>
        </main>
        <footer>
          <div>
            <Logo/>
            <span>Features</span>
            <span>Support</span>
            <span>Company</span>
            <span>Careers</span>
          </div>
        </footer>
      </div>
    )
  }
}
