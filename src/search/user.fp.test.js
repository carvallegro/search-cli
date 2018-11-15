const expect = require('chai').expect

const { fp } = require('./user')

describe('Functional programming utilities', () => {
  2
  describe('#identityFn', () => {
    it('should return true', () => {
      const actual = fp.identityFn([1, 2, 3])({ _id: 1 })
      expect(actual).to.be.true
    })

    it('should return false', () => {
      const actual = fp.identityFn([])({ _id: 1 })
      expect(actual).to.be.false
    })
  })

  describe('#findById', () => {
    const testData = [
      {
        _id: 1,
        name: 'Harry'
      },
      {
        _id: 2,
        name: 'Hermione'
      },
      {
        _id: 3,
        name: 'Ron'
      }
    ]

    it('should return the expected result', () => {
      const expected = [
        {
          _id: 1,
          name: 'Harry'
        }
      ]
      const actual = fp.findById(testData)([1])

      expect(actual).to.deep.equal(expected)
    })

    it('should return empty array', () => {
      const expected = []
      const actual = fp.findById(testData)([1000])

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('#search', () => {
    const testData = [
      {
        _id: 1,
        name: 'Harry',
        age: 13,
        role: 'student'
      },
      {
        _id: 2,
        name: 'Hermione',
        age: 14,
        role: 'student'
      },
      {
        _id: 3,
        name: 'Ron',
        age: 13,
        role: 'student'
      }
    ]

    it('should return empty when no keys are defined', () => {
      const actual = fp.search(testData)({ keys: [] })('Harry')
      expect(actual).to.be.empty
    })

    it('should return empty when nothings matches', () => {
      const actual = fp.search(testData)({ keys: ['name'] })('Not a match')
      expect(actual).to.be.empty
    })

    it('should return Harry', () => {
      const expected = {
        _id: 1,
        name: 'Harry',
        age: 13
      }
      const actual = fp.search(testData)({ keys: ['name'] })('Harry')
      expect(actual).to.have.length(1)
      expect(actual[0]).to.include(expected)
    })

    it('should all of them but sorted by age and name', () => {
      const actual = fp.search(testData)({
        keys: ['role'],
        sortBy: ['age', 'name']
      })('student')

      expect(actual).to.have.length(3)
      expect(actual[0]).to.have.property('name', 'Harry')
      expect(actual[1]).to.have.property('name', 'Ron')
      expect(actual[2]).to.have.property('name', 'Hermione')
    })

    it('should all of them but sorted descending by age and name', () => {
      const actual = fp.search(testData)({
        keys: ['role'],
        sortBy: ['age', 'name'],
        sortDesc: true
      })('student')

      expect(actual).to.have.length(3)
      expect(actual[0]).to.have.property('name', 'Hermione')
      expect(actual[1]).to.have.property('name', 'Ron')
      expect(actual[2]).to.have.property('name', 'Harry')
    })
  })
})
