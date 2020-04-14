import React, { Component } from 'react';

import Upload from './components/Upload/Upload';
import Display from './components/Display/Display';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Upload />
        <br />
        <br />
        <Display />
      </div>
    );
  }
}

export default App;
