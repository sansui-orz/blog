import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';

const Router = () => {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;