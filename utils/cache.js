const NodeCache = require('node-cache');
const cache = new NodeCache();

const set = (key, value, ttl) => {
  cache.set(key, value, ttl);
};

const get = (key) => {
  return cache.get(key);
};

module.exports = { set, get };