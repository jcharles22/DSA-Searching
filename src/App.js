import React, { Component } from 'react';
import './App.css';
import SearchBox from './searchbox';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Seaching Algorithms App</h1>
        <SearchBox />
      </div>
    );
  }
}

export default App;
