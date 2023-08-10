import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Main/Navbar";
import Router from "./routes/Router";
import StreamingPage from "./components/Streaming/StreamingPage";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <StreamingPage></StreamingPage>
    </div>
  );
}

export default App;
