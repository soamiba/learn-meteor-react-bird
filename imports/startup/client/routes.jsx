import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import SignUp from '../../ui/auth/SignUp.jsx';
import LogIn from '../../ui/auth/LogIn.jsx';
import Home from '../../ui/Home.jsx';
import Account from '../../ui/Account.jsx';
import Chat from '../../ui/Chat.jsx';

import App from '../../ui/App.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/account" component={Account} />
      <Route path="/chat" component={Chat} />
    </Route>
  </Router>
);
