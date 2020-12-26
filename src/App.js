import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import './App.css';
import Basket from './Basket';
import Create from './Create';
import Header from "./Header";
import Landing from './Landing';
import Login from './Login';
import Main from './Main';
import View from './View';
import { auth } from './firebase';
import User from './User';

function App() {

  const [,dispatch] = useStateValue();
  const history = useHistory();

  useEffect(()=>{
    //log in user if authstate changes
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser,
        })
        history.push('/view')
      } else {
        dispatch({
          type:'SET_USER',
          user:authUser,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/Create'>
            <Header />
            <Create />
          </Route>

          <Route path='/View'>
            <Header />
            <View />
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

          <Route path='/user'>
            <Header />
            <User />
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
