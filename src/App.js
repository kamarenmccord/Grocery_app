import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Basket from './Basket';
import Header from "./Header";
import Landing from './Landing';
import Login from './Login';
import Main from './Main';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/Create'>
            <Header />

          </Route>

          <Route path='/View'>
            <Header />
            
          </Route>

          <Route path='/Main'>
            <Header />
            <Main />
          </Route>

          <Route path='/Basket'>
            <Header />
            <Basket />
          </Route>

          <Route path='/login'>
            <Header />
            <Login />
          </Route>

          <Route path='/'>
            <Header />
            <Landing />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
