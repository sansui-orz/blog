const { Service } = require('egg');

class NewsService extends Service {
  async list(page = 1) {
    const { serviceUrl, pageSize } = this.config.news;
    const { data: idList } = await this.ctx.curl(`${serviceUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`
      },
      dataType: 'json'
    });

    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serviceUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    return newsList.map(res => res.data);
  }
}

module.exports = NewsService;