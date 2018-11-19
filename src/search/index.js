const pipe = require('lodash/fp/pipe')
const map = require('lodash/fp/map')
const includes = require('lodash/fp/includes')
const filter = require('lodash/fp/filter')
const find = require('lodash/fp/find')
const toString = require('lodash/fp/toString')
const sortBy = require('lodash/fp/sortBy')
const reverse = require('lodash/fp/reverse')
const defaultTo = require('lodash/fp/defaultTo')

const { generateSearchEngine } = require('./core')

const userData = require('./data/users.json')
const organizationData = require('./data/organizations.json')
const ticketData = require('./data/tickets.json')

const USER_PUBLIC_KEYS = [
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
  'role'
]

const ORGANIZATION_PUBLIC_KEYS = [
  '_id',
  'name',
  'domain_names',
  'details',
  'tags'
]

const TICKET_PUBLIC_KEYS = ['created_at', 'type', 'subject', 'description']

const DEFAULT_OPTIONS = {
  sortBy: [],
  sortDesc: false
}

const USER_OPTIONS = {
  ...DEFAULT_OPTIONS,
  keys: USER_PUBLIC_KEYS
}

const ORGANIZATION_OPTIONS = {
  ...DEFAULT_OPTIONS,
  keys: ORGANIZATION_PUBLIC_KEYS
}

const TICKET_OPTIONS = {
  ...DEFAULT_OPTIONS,
  keys: TICKET_PUBLIC_KEYS
}

const userSearch = (query, options = {}) =>
  search(userData)(getOptions(options, USER_OPTIONS))(query)

const organizationSearch = (query, options = {}) =>
  search(organizationData)(getOptions(options, ORGANIZATION_OPTIONS))(query)

const ticketSearch = (query, options = {}) =>
  search(ticketData)(getOptions(options, TICKET_OPTIONS))(query)

const searchUserById = id => find(u => u._id == id)(userData)
const searchOrganizationById = id => find(o => o._id == id)(organizationData)

const search = data => options =>
  pipe(
    generateSearchEngine(data)(options),
    map(toString),
    findById(data),
    sortBy(options.sortBy),
    sortOrder(options)
  )

const findById = data => ids => filter(identityFn(ids))(data)
const identityFn = array => o => includes(`${o._id}`)(array)
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
  ticketSearch,
  searchUserById,
  searchOrganizationById,
  fp: {
    findById,
    identityFn,
    search
  }
}
