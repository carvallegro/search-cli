const Fuse = require('fuse.js')

const DEFAULT_OPTIONS = {
  id: '_id',
  threshold: 0.4,
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

module.exports = search
