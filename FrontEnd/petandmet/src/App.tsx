import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import MainPage from './components/mainpage';
import NoticeList from './components/notice_list';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <MainPage></MainPage> */}
      <NoticeList></NoticeList>
    </div>
  );
}

export default App;
