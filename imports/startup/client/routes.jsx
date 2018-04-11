import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { spring, AnimatedRoute } from 'react-router-transition';

// containers
import AppContainer from '../../ui/containers/AppContainer.jsx'

// pages
import SignupPage from '../../ui/pages/SignupPage.jsx'
import LoginPage from '../../ui/pages/LoginPage.jsx'
import MainPage from '../../ui/pages/MainPage.jsx'



export const renderRoutes = () => (
  <Router>
    <div>
      <Route path="/login" component={LoginPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route exact={true} path="/" component={AppContainer}/>
    </div>
  </Router>
);