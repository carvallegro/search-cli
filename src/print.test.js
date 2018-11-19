var expect = require('chai').expect
var sinon = require('sinon')
require('mocha-sinon')

var chalk = require('chalk')

const { printUsers, printOrganizations, printTickets, utils } = require('./print')

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
      printUsers([])
      expect(console.error.calledOnce).to.be.true
    })

    it('should print an error on console.error when there is no array', () => {
      printUsers()
      expect(console.error.calledOnce).to.be.true
    })

    it('should print one array with id, name and alias', () => {
      printUsers([{
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
      printUsers([{
        verified: true
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with name and alias', () => {
      printUsers([{
        name: 'name',
        alias: 'alias'
      }])

      expect(console.log.calledOnce).to.be.true
    })

  })

  describe('Printing organizations', () => {
    it('should print an error on console.error when there is an empty array', () => {
      printOrganizations([])
      expect(console.error.calledOnce).to.be.true
    })

    it('should print an error on console.error when there is no array', () => {
      printOrganizations()
      expect(console.error.calledOnce).to.be.true
    })

    it('should print one array with id, name and alias', () => {
      printUsers([{
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
      printUsers([{
        'shared_tickets': false
      }])

      expect(console.log.calledOnce).to.be.true
    })

    it('should print one array with shared tickets', () => {
      printUsers([{
        'shared_tickets': true
      }])

      expect(console.log.calledOnce).to.be.true
    })
  })

  describe('Printing tickets', () => {
    it('should print an error on console.error when there is an empty array', () => {
      printTickets([])
      expect(console.error.calledOnce).to.be.true
    })
  })
})

describe('utils', () => {
  describe('getUserCell', ()=>{
    it('should return undefined when no id', () => {
      const actual = utils.getUserCell(undefined)
      expect(actual).to.be.undefined
    })

    it('should return undefined when there is no user', () => {
      const actual = utils.getUserCell(-1)
      expect(actual).to.be.undefined
    })

    it('should return the user cell when there is a user', () => {
      const actual = utils.getUserCell(1)
      const expected = `Francisca Rasmussen ${chalk.grey(1)}`
      expect(actual).to.be.equal(expected)
    })
  })

  describe('getOrganizationCell', ()=>{
    it('should return undefined when no id', () => {
      const actual = utils.getOrganizationCell(undefined)
      expect(actual).to.be.undefined
    })

    it('should return undefined when there is no organization', () => {
      const actual = utils.getOrganizationCell(-1)
      expect(actual).to.be.undefined
    })

    it('should return the user cell when there is an organization', () => {
      const actual = utils.getOrganizationCell(101)
      const expected = `Enthaze ${chalk.grey(101)}`
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#getLink', () => {
    it('should return something', () => {
      const result = utils.getLink('text', 'link')
      expect(result).to.not.be.null
    })
  })

  describe('#formatDate', () => {
    it('should return a date from Zendesk format to output format', () => {
      const actual = utils.formatDate('2013-07-03T06:59:27 UTC')
      const expected = '03-07-13, 6:59am'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#dateFrom', () => {
    let sandbox
    let clock
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      clock = sinon.useFakeTimers(new Date('1900-12-17T03:24:00').getTime())
    })

    afterEach(() => {
      sandbox.restore()
      clock.restore()
    })

    it('should return 100 years ago', () => {
      const actual = utils.dateFrom('1800-07-03T06:59:27 -10:00')
      const expected = '100 years ago'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#enrichPriority', () => {
    it('should test urgent', () => {
      const actual = utils.enrichPriority('urgent')
      const expected = '😱'
      expect(actual).to.be.equal(expected)
    })

    it('should test high', () => {
      const actual = utils.enrichPriority('high')
      const expected = '😨'
      expect(actual).to.be.equal(expected)
    })

    it('should test normal', () => {
      const actual = utils.enrichPriority('normal')
      const expected = '😟'
      expect(actual).to.be.equal(expected)
    })

    it('should test low', () => {
      const actual = utils.enrichPriority('low')
      const expected = '😕'
      expect(actual).to.be.equal(expected)
    })

    it('should test default case', () => {
      const actual = utils.enrichPriority('nothing')
      const expected = '🤔nothing'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#enrichType', () => {
    it('should test incident', () => {
      const actual = utils.enrichType('incident')
      const expected = '‼️'
      expect(actual).to.be.equal(expected)
    })

    it('should test problem', () => {
      const actual = utils.enrichType('problem')
      const expected = '❗'
      expect(actual).to.be.equal(expected)
    })

    it('should test question', () => {
      const actual = utils.enrichType('question')
      const expected = '❓'
      expect(actual).to.be.equal(expected)
    })

    it('should test task', () => {
      const actual = utils.enrichType('task')
      const expected = '📌'
      expect(actual).to.be.equal(expected)
    })

    it('should test default case', () => {
      const actual = utils.enrichType('nothing')
      const expected = '🤔'
      expect(actual).to.be.equal(expected)
    })

  })

  describe('#enrichStatus', () => {
    it('should test closed', () => {
      const actual = utils.enrichStatus('closed')
      const expected = '🚫'
      expect(actual).to.be.equal(expected)
    })

    it('should test solved', () => {
      const actual = utils.enrichStatus('solved')
      const expected = '✅'
      expect(actual).to.be.equal(expected)
    })

    it('should test hold', () => {
      const actual = utils.enrichStatus('hold')
      const expected = '✋'
      expect(actual).to.be.equal(expected)
    })

    it('should test pending', () => {
      const actual = utils.enrichStatus('pending')
      const expected = '🕙'
      expect(actual).to.be.equal(expected)
    })

    it('should test open', () => {
      const actual = utils.enrichStatus('open')
      const expected = '📬'
      expect(actual).to.be.equal(expected)
    })

    it('should test default', () => {
      const actual = utils.enrichStatus('default')
      const expected = '🤔default'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#enrichVia', () => {
    it('should test web', () => {
      const actual = utils.enrichVia('web')
      const expected = '🌍'
      expect(actual).to.be.equal(expected)
    })

    it('should test chat', () => {
      const actual = utils.enrichVia('chat')
      const expected = '📱'
      expect(actual).to.be.equal(expected)
    })

    it('should test voice', () => {
      const actual = utils.enrichVia('voice')
      const expected = '🗣'
      expect(actual).to.be.equal(expected)
    })

    it('should test default', () => {
      const actual = utils.enrichVia('default')
      const expected = 'default'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#colorPriority', () => {
    it('should color adequatly', () => {
      const actual = utils.colorPriority('urgent')
      const expected = chalk.red('urgent')
      expect(actual).to.be.equal(expected)
    })

    it('should return the same', () => {
      const actual = utils.colorPriority('default')
      const expected = 'default'
      expect(actual).to.be.equal(expected)
    })
  })

  describe('#colorStatus', () => {
    it('should color adequatly', () => {
      const actual = utils.colorStatus('closed')
      const expected = chalk.red('closed')
      expect(actual).to.be.equal(expected)
    })

    it('should return the same', () => {
      const actual = utils.colorStatus('default')
      const expected = 'default'
      expect(actual).to.be.equal(expected)
    })
  })
})
