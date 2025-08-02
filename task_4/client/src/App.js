import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';

function App(){
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  function handleLogin(token){
    localStorage.setItem('token', token);
    setToken(token);
  }

  function handleLogout(){
    localStorage.removeItem('token');
    setToken('');
  }

  return(
    <Router>
      <Routes>
        <Route
          path = "/login"
          element = {<LoginPage onLogin={handleLogin}/>}
        />

        <Route
          path = "/register"
          element = {<RegisterPage />}
        />

        <Route 
          path = "users"
          element = {
            token ?
              <UsersPage token = {token} logout={handleLogout} />
            : <Navigate to = "/login"/>
          }
        />

        <Route 
          path = "*"
          element = { <Navigate to= {token ? "/users" : "/login"}/>}
        />
      </Routes>
    </Router>
  );
}

export default App;