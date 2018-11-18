const pipe = require('lodash/fp/pipe')
const map = require('lodash/fp/map')
const includes = require('lodash/fp/includes')
const filter = require('lodash/fp/filter')
const toInteger = require('lodash/fp/toInteger')
const sortBy = require('lodash/fp/sortBy')
const reverse = require('lodash/fp/reverse')
const defaultTo = require('lodash/fp/defaultTo')
const {generateSearchEngine} = require('./engine')

const userData = require('./data/users.json')
const organizationData = require('./data/organizations.json')

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
  // 'url',
  // 'last_login_at',
  // 'external_id'
]

const ORGANIZATION_KEYS = []

const DEFAULT_OPTIONS = {
  sortBy: [],
  sortDesc: false
}

const USER_OPTIONS = {
  ...DEFAULT_OPTIONS,
  keys: USER_KEYS
}

const ORGANIZATION_OPTIONS = {
  ...DEFAULT_OPTIONS,
  keys: ORGANIZATION_KEYS
}

const userSearch = (query, options = USER_OPTIONS) =>
  search(userData)(getOptions(options, USER_OPTIONS))(query)

const organizationSearch = (query, options = ORGANIZATION_OPTIONS) =>
  search(organizationData)(getOptions(options, ORGANIZATION_OPTIONS))(query)


const search = data => options =>
  pipe(
    generateSearchEngine(data)(options),
    map(toInteger),
    findById(data),
    sortBy(options.sortBy),
    sortOrder(options)
  )

const identityFn = array => o => includes(o._id)(array)
const findById = data => ids => filter(identityFn(ids))(data)
const sortOrder = ({ sortBy, sortDesc }) => data =>
  sortBy && sortDesc ? reverse(data) : data

const getOptions = (options, defaults) => ({
  keys: defaultTo(defaults.keys, options.keys),
  sortBy: defaultTo(defaults.sortBy, options.sortBy),
  sortDesc: defaultTo(defaults.sortDesc, options.sortDesc)
})


module.exports = {
  userSearch,
  organizationSearch,
  fp: {
    findById,
    identityFn,
    search
  }
}
