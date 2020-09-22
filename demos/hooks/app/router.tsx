import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Detail from './pages/detail';

export default function router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/about" component={About}></Route>
        <Route path="/detail/:id" component={Detail}></Route>
        <Route path="/" component={Home}></Route>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}