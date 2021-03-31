const markdown2html = require('markdown-into-html');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const crypto = require('crypto');

const articleTemplate = fs.readFileSync(path.resolve(__dirname, './template.article.html')).toString();
async function readArticlesList() {
  const listStr = (await fsPromises.readFile(path.resolve(__dirname, '../../README.md'))).toString();
  const matchObj = listStr.match(/- \[.+\]\(.+\.md\)\n/g);
  if (matchObj && matchObj.length > 0) {
    matchObj.forEach(item => {
      const _matchObj = item.match(/^-\s\[(.+)\]\((.+)\)/);
      writeArticle(_matchObj[1], _matchObj[2]);
    });
  }
}

async function writeArticle(title, _path) {
  const id = crypto.createHash('md5').update(title).digest('hex');
  const htmlCode = await markdown2html({
    path: path.resolve(__dirname, '../../', _path)
  });
  await fsPromises.writeFile(path.resolve(__dirname, '../public/article', id), articleTemplate.replace('{title}', title).replace('{body}', htmlCode));
}

readArticlesList();