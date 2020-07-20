const React = require('react');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const manifest = require('../../build/client/manifest.json');

exports.renderHome = (ctx) => {
  const dom = require(path.resolve(__dirname, '../../build/server/home.js')).default;
  const element = React.createElement(dom({url: '/'}));
  ctx.render('index', {
    store: JSON.stringify({test: 1}),
    script: `<script src="/client${manifest['vendors~home.js']}"></script><script src="/client${manifest['home.js']}"></script>`,
    html: ReactDOMServer.renderToString(element),
  })
};