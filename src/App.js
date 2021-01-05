import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectDefault} from './features/reactSlice';
import './App.css';
import Basket from './Basket';
import Create from './Create';
import Header from "./Header";
import Landing from './Landing';
import Login from './Login';
import Main from './Main';
import View from './View';
import Meal from './Meal';
import { auth } from './firebase';
import User from './User';

function App() {

  const user = useSelector(selectDefault);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    //log in user if authstate changes
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
        dispatch(login({
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.email.split('@')[0],
        }))
        console.log('dispatched');
        history.push('/view')
      } else {
        dispatch(logout())
        console.log('logged out');
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>

          <Route path='/Post/:postId'>
            <Header />
            <Meal />
          </Route>

          <Route path='/update/:postId'>
            <Header />
            <Meal update={true}/>
          </Route>

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
