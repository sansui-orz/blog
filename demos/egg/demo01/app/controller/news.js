const { Controller } = require('egg');

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await this.ctx.render('news/list.tpl', newsList);
  }
}

module.exports = NewsController;