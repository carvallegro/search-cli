const split = require('lodash/split')
const isNil = require('lodash/isNil')

const { userSearch, organizationSearch } = require('./search/user')
const print = require('./print')

const domains= {
  users: {
    search: userSearch,
    print: print.listUsers
  },
  organizations: {
    search: organizationSearch,
    print: print.listOrganizations
  },

}

const runSearchOnUsers = (query, cmd) => {
  const options = generateOptions(cmd.parent)
  const result = userSearch(query, options)
  print.listUsers(result)
  process.exit(0)
}

const runSearchOnOrganizations = (query, cmd) => {
  // const options = generateOptions(cmd.parent)
  // const result = userSearch(query, options)
  print.listOrganizations([{
    "_id": 101,
    "url": "http://initech.zendesk.com/api/v2/organizations/101.json",
    "external_id": "9270ed79-35eb-4a38-a46f-35725197ea8d",
    "name": "Enthaze",
    "domain_names": [
      "kage.com",
      "ecratic.com",
      "endipin.com",
      "zentix.com"
    ],
    "created_at": "2016-05-21T11:10:28 -10:00",
    "details": "MegaCorp",
    "shared_tickets": false,
    "tags": [
      "Fulton",
      "West",
      "Rodriguez",
      "Farley"
    ]
  }])
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
