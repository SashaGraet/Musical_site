import React, {createContext, useContext, useEffect} from 'react';
import './App.css';
import Login from "./pages/Login";
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import SearchUsers from './pages/SearchUsers';
import Profile from './pages/Profile';
import useProfile from "./hooks/useProfile";
import ChangeProfile from "./pages/ChangeProfile";

export const ProfileContext = createContext<ReturnType<typeof useProfile> | null>(null)
function App() {
  const profileManager = useProfile()

  useEffect(() => {
    profileManager?.infoUser()
  }, []);

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
              <Route path='/searchusers' element={<SearchUsers/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/changeProfile' element={<ChangeProfile/>}/>
            </Routes>
          </ProfileContext.Provider>
        </main>
      </Router>
    </div>
  );
}

export default App;
