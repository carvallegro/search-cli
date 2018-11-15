const expect = require('chai').expect

const { userSearch } = require('./user')

describe('the user search', () => {
  it('should return empty when keys is an empty string', () => {
    const actual = userSearch('test', { keys: [] })
    expect(actual).to.be.empty
  })

  it('should return the user Lou Schmidt', () => {
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
      signature: "Don't Worry Be Happy!",
      organization_id: 104,
      tags: ['Cawood', 'Disautel', 'Boling', 'Southview'],
      suspended: true,
      role: 'admin'
    }
    const actual = userSearch('Shannon')

    expect(actual).to.have.length(1)
    expect(actual[0]).to.deep.equal(expected)
  })
})
