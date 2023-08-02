import React from 'react'
import logo from './logo.svg'
import './App.css'
import Navbar from './components/Main/Navbar'
import Router from './routes/Router'
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Router></Router>
    </div>
  )
}

export default App
