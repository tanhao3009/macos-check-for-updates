import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header 
        appName={'@OsxUpdaterAdmin'}
        currentUser={''}/>
    </div>
  );
}

export default App;
