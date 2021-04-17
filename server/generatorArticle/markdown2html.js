const markdown2html = require('markdown-into-html');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const crypto = require('crypto');

const articleTemplate = fs.readFileSync(path.resolve(__dirname, './template.article.html')).toString();
const homeTemplate = fs.readFileSync(path.resolve(__dirname, './template.home.html')).toString();

async function readArticlesList() {
  const listStr = (await fsPromises.readFile(path.resolve(__dirname, '../../README.md'))).toString();
  const matchObj = listStr.match(/- \[.+\]\(.+\.md\)\n/g);
  const listHtml = matchObj.map(item => {
    const _matchObj = item.match(/^-\s\[(.+)\]\((.+)\)/);
    const id = crypto.createHash('md5').update(_matchObj[1]).digest('hex');
    writeArticle(id, _matchObj[1], _matchObj[2]);
    return `<li>
      <span>03-20</span>&nbsp;&nbsp;/&nbsp;&nbsp;<a href="./article/${id}">${_matchObj[1]}</a>
    </li>`;
  });
  let finalHtmlStr = `
    <ul>
      <li>2021
        <ul>
  `;
  let year = 2021;
  listHtml.forEach((str, index) => {
    if (Math.random() < 0.2) {
      year -= 1;
      finalHtmlStr += `</ul></li><li>${year}<ul>`;
    }
    finalHtmlStr += str;
  });
  finalHtmlStr += '</ul></li></ul>';
  await fsPromises.writeFile(path.resolve(__dirname, '../public/home.html'), homeTemplate.replace('{body}', finalHtmlStr));
}

async function writeArticle(id, title, _path) {
  try {
    const htmlCode = await markdown2html({
      path: path.resolve(__dirname, '../../', _path)
    });
    await fsPromises.writeFile(
      path.resolve(__dirname, '../public/article', id),
      articleTemplate.replace('{title}', title).replace('{body}', htmlCode.replace(/"\.\/imgs\//g, '"../imgs/').replace('language-tsx', 'javascript')));
  } catch (err) {
    console.log('生成文章失败: ', err);
    console.log(path.resolve(__dirname, '../../', _path));
  }
}

readArticlesList();