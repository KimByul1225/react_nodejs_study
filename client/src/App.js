import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
//import Footer from './components/views/Footer/Footer';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route exact path="/login" element = {<LoginPage />} />
          <Route exact path="/register" element = {<RegisterPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
