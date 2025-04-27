import React from "react"
import Home from "./components/Home"
import NavBar from "./components/Nav";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyEmail from "./components/emailverify";


function App() {


  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/emailverify" element={<VerifyEmail/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
