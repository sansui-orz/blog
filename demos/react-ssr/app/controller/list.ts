import * as React from 'react';
import * as path from 'path';
import * as ReactDOMServer from'react-dom/server';

export default function renderList(ctx) {
  const manifest = require(path.resolve(__dirname, '../../build/client/manifest.json'));
  const dom = require(path.resolve(__dirname, '../../build/server/home.js')).default;
  const element = React.createElement(dom({url: '/list'}));
  ctx.render('index', {
    store: JSON.stringify({test: 1}),
    script: `<script src="/client${manifest['vendors~home.js']}"></script><script src="/client${manifest['home.js']}"></script>`,
    html: ReactDOMServer.renderToString(element),
  })
};