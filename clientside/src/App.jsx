// import { useState } from "react"
import React from "react"
import Home from "./components/Home"
import NavBar from "./components/Nav";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Login";


function App() {


  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
