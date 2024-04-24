import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./pages/Login";
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Search from './pages/Search';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </main>
      </Router>
    </div>
  );
}

export default App;
