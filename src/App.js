import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './Landing';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/'>
            <Landing />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
