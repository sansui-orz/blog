import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Index from './pages/index/index';
import About from './pages/about/about';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/" component={Index} />
        <Redirect to="/" component={Index} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;