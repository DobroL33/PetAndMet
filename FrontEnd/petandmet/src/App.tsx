import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Main/Navbar';
import MainPage from './components/Main/MainPage';
import Container from '@mui/material/Container';
import banner from './images/banner.jpg';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Container sx={{padding: '0 !important'}}>
        <img src={banner} alt="" style={{paddingTop : 10, width: '100%'}} />
      </Container>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
