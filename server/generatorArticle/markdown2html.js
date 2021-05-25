const markdown2html = require('markdown-into-html');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const crypto = require('crypto');
const { Octokit } = require('@octokit/core');
const { token } = require('../config/github');
const { once } = require('events');
const readline = require('readline');

const octokit = new Octokit({ auth: token });

const ISSUESMAP_PATH = path.resolve(__dirname, '../issues.map.json');

const articleTemplate = fs.readFileSync(path.resolve(__dirname, './template.article.html')).toString();
const homeTemplate = fs.readFileSync(path.resolve(__dirname, './template.home.html')).toString();

async function readArticlesList() {
  const listStr = (await fsPromises.readFile(path.resolve(__dirname, '../../README.md'))).toString();
  const matchObj = listStr.match(/- \[.+\]\(.+\.md\)\n/g);
  const issuesRecord = JSON.parse(fs.existsSync(ISSUESMAP_PATH) ? fs.readFileSync(ISSUESMAP_PATH) : '{}');
  const issuesPromises = [];
  const listHtml = matchObj.map(async item => {
    const _matchObj = item.match(/^-\s\[(.+)\]\((.+)\)/);
    const filepath = path.resolve(__dirname, '../../', _matchObj[2]);
    const id = crypto.createHash('md5').update(_matchObj[1]).digest('hex');
    const articleDetail = await matchArticleDetail(filepath);
    writeArticle(id, _matchObj[1], filepath, articleDetail);

    !issuesRecord[id] && issuesPromises.push(createIssues(_matchObj[1], id, issuesRecord));
    return {
      html: `<li>
        <span>${articleDetail.month}-${articleDetail.day}</span>&nbsp;&nbsp;/&nbsp;&nbsp;<a href="./article/${id}">${_matchObj[1]}</a>
      </li>`,
      detail: articleDetail
    };
  });
  const sortList = (await Promise.all(listHtml)).sort((pre, nxt) => {
    const arr = ['year', 'month', 'day'];
    for (let i = 0; i < 3; i++) {
      if (+pre.detail[arr[i]] > +nxt.detail[arr[i]]) {
        return -1;
      } else if (+pre.detail[arr[i]] < +nxt.detail[arr[i]]) {
        return 1;
      }
    }
    return 0;
  });
  let year = sortList[0].detail.year;

  let finalHtmlStr = `
    <ul>
      <li>${year}
        <ul>
  `;
  sortList.forEach((item) => {
    if (year !== item.detail.year) {
      year = item.detail.year;
      finalHtmlStr += `</ul></li><li>${year}<ul>`;
    }
    finalHtmlStr += item.html;
  });
  finalHtmlStr += '</ul></li></ul>';
  await Promise.all(issuesPromises);
  await fsPromises.writeFile(ISSUESMAP_PATH, JSON.stringify(issuesRecord));
  await fsPromises.writeFile(path.resolve(__dirname, '../public/home.html'), homeTemplate.replace('{body}', finalHtmlStr));
}

async function writeArticle(id, title, filepath, articleDetail) {
  try {
    const htmlCode = await markdown2html({
      path: filepath,
      options: {
        linkify: false
      }
    });
    await fsPromises.writeFile(
      path.resolve(__dirname, '../public/article', id),
      articleTemplate
        .replace('{title}', title)
        .replace('{tags}', articleDetail.tags.join(' / '))
        .replace('gitalk-id', id)
        .replace('{menu}', renderMenu(articleDetail.menu))
        .replace('{createtime}', `${articleDetail.year}-${articleDetail.month}-${articleDetail.day}`)
        .replace('{body}', renderTitleIdMap(htmlCode, articleDetail.menu)
          .replace(/"\.\/imgs\//g, '"../imgs/')
          .replace('language-tsx', 'javascript')
          .replace(/\.\.\/demos/g, 'https://sansui-orz.github.io/blog/demos')
          .replace(/\.\/(.*)\.md/g, function (str, targetStr) {
            return str.replace(`${targetStr}.md`, crypto.createHash('md5').update(decodeURIComponent(targetStr)).digest('hex'));
          })
        ));
  } catch (err) {
    console.log('生成文章失败: ', err);
    console.log(filepath);
  }
}

function renderMenu(menu) {
  return menu.map(item => {
    return `<div class="menu-${item.level}"><a href="#${item.id}">${item.title}</a></div>`;
  }).join('');
}

function renderTitleIdMap(html, menu) {
  for (let i = 0; i < menu.length; i++) {
    const { level, title, id } = menu[i];
    html = html.replace(`<h${level + 1}>${title}`, `<h${level + 1} id="${id}">${title}`);
  }
  return html;
}

async function createIssues(title, id, issuesRecord) {
  try {
    await octokit.request('POST /repos/sansui-orz/blog/issues', {
      owner: 'sansui-orz',
      repo: 'blog',
      title: `【${title}】的评论`,
      body: `使用github api统一生成: https://docs.github.com/en/rest/reference/issues#create-an-issue
      进入博客拥有更好体验: https://www.lmsdelck.xyz/blog/article/${id}`,
      labels: ['Gitalk', id]
    });
    issuesRecord[id] = title;
    console.log('文章issues已关联: ', title);
  } catch (err) {
    console.error('文章issues创建失败: ', title, err);
  }
}

/** 匹配商品详情 */
async function matchArticleDetail(filename) {
  try {
    const res = await fsPromises.readFile(filename);
    const fileContent = res.toString();
    const createMatch = fileContent.match(/\[create\]:(\d{4})-(\d{2})-(\d{2})/);
    const [_, year, month, day] = createMatch || [];
    const tagMatch = fileContent.match(/\[tag\]:(.+)\n/);
    const tags = tagMatch[1].split('|');
    const menu = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });
    rl.on('line', (line) => {
      // 处理行。
      if (/^(#{2,4})\s(.*)/.test(line)) {
        const match = line.match(/^(#{2,4})\s(.*)/);
        menu.push({
          title: match[2],
          level: match[1].length - 1,
          id: crypto.createHash('md5').update(match[2]).digest('hex'),
        });
      }
    });
    await once(rl, 'close');
    return {
      year,
      month,
      day,
      tags,
      menu
    };
  } catch (err) {
    console.error('error: ', err);
  }
}

readArticlesList();