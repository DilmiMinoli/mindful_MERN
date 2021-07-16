import './App.css';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Pages/Home';
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Login/Login';
import UserDashboard from './components/Pages/UserDashboard';
import AdminDashboard from './components/Pages/AdminDashboard';

function App() {
  return (
    <div className="App">
     <>
  <Router>
  <Navbar />
    <Switch>
    
    <Route path='/' exact component = {Home}/>
    <Route path='/register' exact component = {Register}/>
    <Route path='/login' exact component = {Login}/>
    <Route path='/user/dashboard' exact component={UserDashboard}/>
    <Route path='/admin/dashboard' exact component={AdminDashboard}/>
     </Switch>
    </Router>
  </>
    </div>
  );
}

export default App;
