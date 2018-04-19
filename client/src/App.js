import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Router from './routes/Router';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
}

export default App;
