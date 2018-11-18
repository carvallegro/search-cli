var expect = require('chai').expect
require('mocha-sinon')

const { listUsers, listOrganizations } = require('./print')

describe('Printing features', () => {

  beforeEach(function() {
    this.logStub = this.sinon.stub(console, 'log')
    this.errorLog = this.sinon.stub(console, 'error')
  })

  afterEach(function() {
    this.logStub.reset()
    this.errorLog.reset()
  })

  describe('Printing users', () => {
    it('should print an error on console.error when there is an empty array', () => {
      listUsers([])
      expect(console.error.calledOnce).to.be.true
    })

    it('should print an error on console.error when there is no array', () => {
      listUsers()
      expect(console.error.calledOnce).to.be.true
    })

    it('should print one array with id, name and alias', () => {
      listUsers([{
        '_id': 5,
        name: 'name',
        alias: 'alias',
        organization_id: 10,
        email: 'abc@xyz.com',
        phone: '0421123432',
        'last_login_at': '2012-09-25T01:32:46 -10:00'
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with verified true', () => {
      listUsers([{
        verified: true
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with name and alias', () => {
      listUsers([{
        name: 'name',
        alias: 'alias'
      }])

      expect(console.log.calledOnce).to.be.true
    })

  })

  describe('Printing organizations', () => {
    it('should print an error on console.error when there is an empty array', () => {
      listOrganizations([])
      expect(console.error.calledOnce).to.be.true
    })

    it('should print an error on console.error when there is no array', () => {
      listOrganizations()
      expect(console.error.calledOnce).to.be.true
    })

    it('should print one array with id, name and alias', () => {
      listUsers([{
        '_id': 108,
        'url': 'http://initech.zendesk.com/api/v2/organizations/108.json',
        'external_id': 'be72663b-338d-42f4-bd52-cf6584cad674',
        'name': 'Zolarex',
        'domain_names': [
          'elemantra.com',
          'zizzle.com',
          'miraclis.com',
          'overplex.com'
        ],
        'created_at': '2016-07-26T09:35:57 -10:00',
        'details': 'Non profit',
        'shared_tickets': false
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with no shared tickets', () => {
      listUsers([{
        'shared_tickets': false
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with shared tickets', () => {
      listUsers([{
        'shared_tickets': true
      }])

      expect(console.log.calledOnce).to.be.true
    })
  })
})
