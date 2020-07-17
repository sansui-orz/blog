import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from '../router';

function ClientRender() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

ReactDOM.hydrate(<ClientRender />, document.getElementById('app'));

if (module.hot) { // 如果报nodeModule上不存在 hot 则安装 @types/webpack-env
  module.hot.accept();
}