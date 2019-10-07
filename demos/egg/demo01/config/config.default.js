exports.keys = 'egg-demo01';

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks'
  }
};

exports.news = {
  pageSize: 5,
  serviceUrl: 'https://hacker-news.firebaseio.com/v0'
};

exports.middleware = ['robot'];

exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};