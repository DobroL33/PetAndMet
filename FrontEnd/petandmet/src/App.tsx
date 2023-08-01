import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import MainPage from "./components/mainpage";
import WalkPage from "./components/walkpage";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
