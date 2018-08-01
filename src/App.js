import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './searchbox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Seaching Algorithms App</h1>
        </header>
        <SearchBox />
      </div>
    );
  }
}

export default App;
