import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Main/Navbar";
import "react-calendar/dist/Calendar.css";
import Container from "@mui/material/Container";
import MainPage from "./components/Main/MainPage";
import StreamingPage from "./components/Streaming/StreamingPage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Container sx={{ padding: "0 !important" }}></Container>
      <StreamingPage></StreamingPage>
    </div>
  );
}

export default App;
