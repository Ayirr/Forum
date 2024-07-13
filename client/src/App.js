import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from './Context/appcontext';
import Home from './Pages/Home/home';
import "./Components/page/page.css";
import Navbar from './Components/page/Navbar/navbar';
import "./Components/page/page.css";
import "./Components/form/form.css";
import Register from './Components/page/register/register';
import Login from './Components/page/login/login';
import Profile from './Components/page/profile/profile';
import Createcategory from './Components/page/category/create/createcategory';
import httpclient from './services/httpclient';
import "./Components/commoncss/lis/list.css"

function App() {
  const [isInitiated, setIsInitiated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.setItem('token', null);
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const { data } = await httpclient().get(`/api/user/init`);
      setUser(data.user);
    } catch (error) {
      console.error('Error initializing user:', error);
    } finally {
      setIsInitiated(true);
    }
  };

  return (
    <div>
      {isInitiated && (
        <AppContext.Provider value={{ user, setUser, logout }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/create" element={user ? <Createcategory /> : <Navigate to="/auth/login" />} />
              <Route path="/auth/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/auth/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth/login" />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;
