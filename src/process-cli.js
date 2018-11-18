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

const runSearchOnUsers = (query, cmd) => {
  const options = generateOptions(cmd.parent)
  const result = userSearch(query, options)
  print.listUsers(result)
  process.exit(0)
}

const runSearchOnOrganizations = (query, cmd) => {
  const options = generateOptions(cmd.parent)
  const result = organizationSearch(query, options)
  print.listOrganizations(result)
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
  runSearchOnUsers,
  runSearchOnOrganizations,
  generateOptions,
  generateKeys
}
