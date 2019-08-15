import React, {Fragment, useEffect} from 'react';
import Navbar from './Components/layout/Navbar';
import Landing from './Components/layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from './Components/layout/Alert';
import Dashboard from './Components/dashboard/Dashboard';
import CreateProfile from './Components/layout/profile-forms/CreateProfile';
import EditProfile from './Components/layout/profile-forms/EditProfile';
import PrivateRoute from './Components/routing/PrivateRoute';
import Profiles from './Components/profiles/Profiles'
import Profile from './Components/profile/Profile';
import Posts from './Components/posts/Posts';
import Post from './Components/post/Post';
//Redux
import { Provider } from 'react-redux';
import store from './store'
import {loadUser} from './actions/auth';
// import setAuthToken from './utils/setAuthToken'

import './App.css';



const  App = () => {
  useEffect(() => {
    if (localStorage.token) {
    store.dispatch(loadUser())
    }
    //Brackets make this only run once
  }, [])

  return (
<Provider store={store}>
<Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={Landing} />
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profiles/user/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </section>
  </Fragment>
  </Router>
  </Provider>
  )};

export default App;
