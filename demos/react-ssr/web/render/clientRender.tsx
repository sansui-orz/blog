import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router';

function ClientRender() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

ReactDOM.hydrate(<ClientRender />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}