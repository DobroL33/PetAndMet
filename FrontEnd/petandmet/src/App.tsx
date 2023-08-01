import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import MainPage from "./components/mainpage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WalkPage from "./components/Volunteer/walkpage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      {/* <MainPage></MainPage> */}
      <WalkPage></WalkPage>
    </div>
  );
}

export default App;
