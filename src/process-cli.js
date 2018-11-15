const split = require('lodash/split')
const isNil = require('lodash/isNil')

const { userSearch } = require('./search/user')
const print = require('./print')

const runSearch = (query, cmd) => {
  const options = generateOptions(cmd.parent)
  const result = userSearch(query, options)
  print.listUsers(result)
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
  runSearch,
  generateOptions,
  generateKeys
}
