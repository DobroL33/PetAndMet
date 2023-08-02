import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Main/Navbar";
import "react-calendar/dist/Calendar.css";
import Container from "@mui/material/Container";
import MainPage from "./components/Main/MainPage";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Container sx={{ padding: "0 !important" }}></Container>
      <MainPage></MainPage>
    </div>
  );
}

export default App;
