import React, {createContext, useContext, useEffect} from 'react';
import './App.css';
import Login from "./pages/Login";
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Search from './pages/Search';
import Profile from './pages/Profile';
import useProfile from "./hooks/useProfile";

export const ProfileContext = createContext<ReturnType<typeof useProfile> | null>(null)

function App() {
  const profileManager = useProfile()
  console.log(profileManager)
  return (
    <div className="App">
      <Router>
        <Navigation />
        <main>
          <ProfileContext.Provider value={profileManager}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          </ProfileContext.Provider>
        </main>
      </Router>
    </div>
  );
}

export default App;
