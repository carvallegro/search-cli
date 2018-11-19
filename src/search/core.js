const Fuse = require('fuse.js')

const DEFAULT_OPTIONS = {
  id: '_id',
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3
}

const search = data => (query, options = {}) =>
  new Fuse(data, {
    ...DEFAULT_OPTIONS,
    ...options
  }).search(query)

const generateSearchEngine = data => options => query =>
  search(data)(query, { keys: options.keys })

module.exports = {
  search,
  generateSearchEngine
}
