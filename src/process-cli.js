const split = require('lodash/split')
const isNil = require('lodash/isNil')

const search = require('./search')
const print = require('./print')

const domains= {
  users: {
    search: search.userSearch,
    print: print.printUsers
  },
  organizations: {
    search: search.organizationSearch,
    print: print.printOrganizations
  },
  tickets: {
    search: search.ticketSearch,
    print: print.printTickets
  }
}

const runSearchOn = domain => (query, cmd) => {
  if(isNil(domains[domain])){
    throw new Error('This domain does not exist')
  }

  const options = generateOptions(cmd.parent)
  const result = domains[domain].search(query, options)
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

const printKeys = () => print.printKeys(search.keys)

module.exports = {
  runSearchOn,
  generateOptions,
  generateKeys,
  printKeys
}
