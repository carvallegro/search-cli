const expect = require('chai').expect
require('mocha-sinon')

const processCli = require('./process-cli')

describe('Process functions', () => {

  describe('#generateOptions', () => {
    it('should generate appropriate options when all is undefined', () => {
      const param = {
        attributes: undefined,
        sortBy: undefined,
        sortOrder: undefined
      }
      const expected = {
        keys: undefined,
        sortBy: undefined,
        sortDesc: false
      }
      const actual = processCli.generateOptions(param)
      expect(actual).to.deep.equal(expected)
    })

    it('should generate appropriate options when all is null', () => {
      const param = {
        attributes: null,
        sortBy: null,
        sortOrder: null
      }
      const expected = {
        keys: undefined,
        sortBy: undefined,
        sortDesc: false
      }
      const actual = processCli.generateOptions(param)
      expect(actual).to.deep.equal(expected)
    })

    it('should generate appropriate options when values are set', () => {
      const param = {
        attributes: 'a,b,c',
        sortBy: 'x,y,z',
        sortOrder: 'desc'
      }
      const expected = {
        keys: ['a', 'b', 'c'],
        sortBy: ['x', 'y', 'z'],
        sortDesc: true
      }
      const actual = processCli.generateOptions(param)
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('#generateKeys', () => {
    it('should return undefined when null is given', () => {
      expect(processCli.generateKeys(null)).to.be.undefined
    })

    it('should return undefined when undefined is given', () => {
      expect(processCli.generateKeys(undefined)).to.be.undefined
    })

    it('should return undefined when "all" is given', () => {
      expect(processCli.generateKeys('all')).to.be.undefined
    })

    it('should return array when value is give is given', () => {
      expect(processCli.generateKeys('a,b,c')).to.deep.equal(['a', 'b', 'c'])
    })
  })
})

describe('#runSearchOn', () => {
  beforeEach(function() {
    this.processStub = this.sinon.stub(process, 'exit')
  })

  afterEach(function() {
    this.processStub.reset()
  })

  it('should fail when running a search on a non existing domain', () => {
    expect(processCli.runSearchOn('not a domain')).to.throw('This domain does not exist')
  })

  it('should do nothing when proper search', () => {
    processCli.runSearchOn('users')('tes',{parent: {}})

    expect(true).to.be.true
  })
})
