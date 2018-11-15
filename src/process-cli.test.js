const expect = require('chai').expect

const process = require('./process-cli')

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
      const actual = process.generateOptions(param)
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
      const actual = process.generateOptions(param)
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
      const actual = process.generateOptions(param)
      expect(actual).to.deep.equal(expected)
    })
  })

  describe('#generateKeys', () => {
    it('should return undefined when null is given', () => {
      expect(process.generateKeys(null)).to.be.undefined
    })

    it('should return undefined when undefined is given', () => {
      expect(process.generateKeys(undefined)).to.be.undefined
    })

    it('should return undefined when "all" is given', () => {
      expect(process.generateKeys('all')).to.be.undefined
    })

    it('should return array when value is give is given', () => {
      expect(process.generateKeys('a,b,c')).to.deep.equal(['a', 'b', 'c'])
    })
  })
})
