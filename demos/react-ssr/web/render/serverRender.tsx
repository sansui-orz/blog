import React from 'react';
import { StaticRouter } from 'react-router';
import Router from '../router';

export default function ServerRender(req: {url: string}) {
  return () => {
    return (
      <StaticRouter location={req.url}>
        <Router />
      </StaticRouter>
    );
  };
}
