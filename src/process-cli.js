const split = require('lodash/split')
const isNil = require('lodash/isNil')

const { userSearch, organizationSearch } = require('./search/index')
const print = require('./print')

const domains= {
  users: {
    search: userSearch,
    print: print.listUsers
  },
  organizations: {
    search: organizationSearch,
    print: print.listOrganizations
  }
}

const runSearchOn = domain => (query, cmd) => {
  if(isNil(domains[domain])){
    throw new Error('This domain does not exist')
  }

  const options = generateOptions(cmd.parent)
  const result = domains[domain].search(query, options)
  print.listUsers(result)
  domains[domain].print(result)
  process.exit(0)
}

const generateOptions = ({ attributes, sortBy, sortOrder }) => ({
  keys: generateKeys(attributes),
  sortBy: !isNil(sortBy) ? split(sortBy, ',') : undefined,
  sortDesc: sortOrder === 'desc'
})

const generateKeys = function(attributes) {
  if (isNil(attributes)) {
    return undefined
  }

  if (attributes === 'all') {
    return undefined
  }

  return split(attributes, ',')
}

module.exports = {
  runSearchOn,
  generateOptions,
  generateKeys
}
