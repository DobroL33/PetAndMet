import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import MainPage from './components/mainpage';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
