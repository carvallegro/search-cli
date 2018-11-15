const pipe = require('lodash/fp/pipe')
const map = require('lodash/fp/map')
const includes = require('lodash/fp/includes')
const filter = require('lodash/fp/filter')
const toInteger = require('lodash/fp/toInteger')
const sortBy = require('lodash/fp/sortBy')

const searchEngine = require('./engine')

const userData = require('./data/users.json')

const USER_KEYS = [
  '_id',
  'name',
  'alias',
  'active',
  'verified',
  'shared',
  'timezone',
  'email',
  'phone',
  'signature',
  'tags',
  'suspended',
  'role',
  // Private keys
  'url',
  'last_login_at',
  'external_id'
]

const DEFAULT_OPTIONS = {
  keys: USER_KEYS,
  sortBy: []
}

const generateSearchEngine = data => options => query => searchEngine(data)(query, { keys: options.keys })

const identityFn = array => o => includes(o._id)(array)
const findById = data => ids => filter(identityFn(ids))(data)
const search = data => options => pipe(generateSearchEngine(data)(options), map(toInteger), findById(data), sortBy(options.sortBy))

const userSearch = (query, options = DEFAULT_OPTIONS) => search(userData)(options)(query)

module.exports = {
  userSearch,
  fp: {
    findById,
    identityFn,
    search
  }
}
