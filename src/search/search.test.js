const expect = require('chai').expect

const { userSearch, ticketSearch, organizationSearch, findUserById, findOrganizationById } = require('./index')

const expectedUser = {
  _id: 7,
  url: 'http://initech.zendesk.com/api/v2/users/7.json',
  external_id: 'bce94e82-b4f4-438f-bc0b-2440e8265705',
  name: 'Lou Schmidt',
  alias: 'Miss Shannon',
  created_at: '2016-05-07T08:43:52 -10:00',
  active: false,
  verified: false,
  shared: false,
  locale: 'en-AU',
  timezone: 'Central African Republic',
  last_login_at: '2016-02-25T12:26:31 -11:00',
  email: 'shannonschmidt@flotonic.com',
  phone: '9094-083-167',
  signature: 'Don\'t Worry Be Happy!',
  organization_id: 104,
  tags: ['Cawood', 'Disautel', 'Boling', 'Southview'],
  suspended: true,
  role: 'admin'
}

const expectedOrg = {
  _id: 101,
  url: 'http://initech.zendesk.com/api/v2/organizations/101.json',
  external_id: '9270ed79-35eb-4a38-a46f-35725197ea8d',
  name: 'Enthaze',
  domain_names: ['kage.com', 'ecratic.com', 'endipin.com', 'zentix.com'],
  created_at: '2016-05-21T11:10:28 -10:00',
  details: 'MegaCorp',
  shared_tickets: false,
  tags: ['Fulton', 'West', 'Rodriguez', 'Farley']
}

describe('the search functions', () => {
  describe('the user search', () => {
    it('should return empty when keys is an empty string', () => {
      const actual = userSearch('test', { keys: [] })
      expect(actual).to.be.empty
    })

    it('should return the user Lou Schmidt', () => {
      const actual = userSearch('Shannon')
      expect(actual).to.have.length(1)
      expect(actual[0]).to.deep.equal(expectedUser)
    })
  })

  describe('the organization search', () => {
    it('should return empty when keys is an empty string', () => {
      const actual = organizationSearch('test', { keys: [] })
      expect(actual).to.be.empty
    })

    it('should return the organization Enthaze', () => {
      const actual = organizationSearch('Enthaze')

      expect(actual).to.have.length(1)
      expect(actual[0]).to.deep.equal(expectedOrg)
    })
  })

  describe('the ticket search', () => {
    it('should return empty when keys is an empty string', () => {
      const actual = ticketSearch('test', { keys: [] })
      expect(actual).to.be.empty
    })

    it('should return the ticket "A Catastrophe in Micronesia"', () => {
      const expected = {
        _id: '1a227508-9f39-427c-8f57-1b72f3fab87c',
        url:
          'http://initech.zendesk.com/api/v2/tickets/1a227508-9f39-427c-8f57-1b72f3fab87c.json',
        external_id: '3e5ca820-cd1f-4a02-a18f-11b18e7bb49a',
        created_at: '2016-04-14T08:32:31 -10:00',
        type: 'incident',
        subject: 'A Catastrophe in Micronesia',
        description:
          'Aliquip excepteur fugiat ex minim ea aute eu labore. Sunt eiusmod esse eu non commodo est veniam consequat.',
        priority: 'low',
        status: 'hold',
        submitter_id: 71,
        assignee_id: 38,
        organization_id: 112,
        tags: ['Puerto Rico', 'Idaho', 'Oklahoma', 'Louisiana'],
        has_incidents: false,
        due_at: '2016-08-15T05:37:32 -10:00',
        via: 'chat'
      }

      const actual = ticketSearch('Micronesia')

      expect(actual).to.have.length(1)
      expect(actual[0]).to.deep.equal(expected)
    })
  })

  describe('Search user by id', () => {
    const expected = {
      _id: 7,
      url: 'http://initech.zendesk.com/api/v2/users/7.json',
      external_id: 'bce94e82-b4f4-438f-bc0b-2440e8265705',
      name: 'Lou Schmidt',
      alias: 'Miss Shannon',
      created_at: '2016-05-07T08:43:52 -10:00',
      active: false,
      verified: false,
      shared: false,
      locale: 'en-AU',
      timezone: 'Central African Republic',
      last_login_at: '2016-02-25T12:26:31 -11:00',
      email: 'shannonschmidt@flotonic.com',
      phone: '9094-083-167',
      signature: 'Don\'t Worry Be Happy!',
      organization_id: 104,
      tags: ['Cawood', 'Disautel', 'Boling', 'Southview'],
      suspended: true,
      role: 'admin'
    }
    it('should return the expected user with string id', () => {
      const actual = findUserById('7')

      expect(actual).to.deep.equal(expected)
    })

    it('should return the expected user with integer id', () => {
      const actual = findUserById(7)

      expect(actual).to.deep.equal(expected)
    })

    it('should return undefined when no id', () => {
      const actual = findUserById(undefined)

      expect(actual).to.be.undefined
    })

    it('should return undefined when does not exist', () => {
      const actual = findUserById(-1)

      expect(actual).to.be.undefined
    })
  })

  describe('Search organization by id', () => {
    it('should return the expectedOrg organization with string id', () => {
      const actual = findOrganizationById('101')

      expect(actual).to.deep.equal(expectedOrg)
    })

    it('should return the expectedOrg organization with integer id', () => {
      const actual = findOrganizationById(101)

      expect(actual).to.deep.equal(expectedOrg)
    })

    it('should return undefined when no id', () => {
      const actual = findOrganizationById(undefined)

      expect(actual).to.be.undefined
    })

    it('should return undefined when does not exist', () => {
      const actual = findOrganizationById(-1)

      expect(actual).to.be.undefined
    })
  })
})
