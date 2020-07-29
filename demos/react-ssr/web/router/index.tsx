import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/home';
import About from '../pages/about';
import List from '../pages/list';

const Router = () => {
  return (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/list" component={List} />
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;