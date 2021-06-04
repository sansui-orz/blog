const NodeCache = require('node-cache');

const nodeCache = new NodeCache({ stdTTL: 24 * 60 * 60, checkperiod: 60 * 60 }); // 缓存存活时间1D，检查缓存周期1H

module.exports = nodeCache;

