const expect = require('chai').expect

const search = require('./engine')

const testData = [
  {
    _id: 1,
    title: "Old Man's War",
    author: {
      firstName: 'John',
      lastName: 'Scalzi'
    }
  },
  {
    _id: 2,
    title: 'The Lock Artist',
    author: {
      firstName: 'Steve',
      lastName: 'Hamilton'
    }
  },
  {
    _id: 3,
    title: 'HTML5',
    author: {
      firstName: 'Remy',
      lastName: 'Sharp'
    }
  },
  {
    _id: 4,
    title: 'Right Ho Jeeves',
    author: {
      firstName: 'P.D',
      lastName: 'Woodhouse'
    }
  },
  {
    _id: 5,
    title: 'The Code of the Wooster',
    author: {
      firstName: 'P.D',
      lastName: 'Woodhouse'
    }
  },
  {
    _id: 6,
    title: 'Thank You Jeeves',
    author: {
      firstName: 'P.D',
      lastName: 'Woodhouse'
    }
  },
  {
    _id: 7,
    title: 'The DaVinci Code',
    author: {
      firstName: 'Dan',
      lastName: 'Brown'
    }
  },
  {
    _id: 8,
    title: 'Angels & Demons',
    author: {
      firstName: 'Dan',
      lastName: 'Brown'
    }
  },
  {
    _id: 9,
    title: 'Syrup',
    author: {
      firstName: 'Max',
      lastName: 'Barry'
    }
  },
  {
    _id: 10,
    title: 'The Book of Lies',
    author: {
      firstName: 'Brad',
      lastName: 'Meltzer'
    }
  },
  {
    _id: 11,
    title: 'Lamb',
    author: {
      firstName: 'Christopher',
      lastName: 'Moore'
    }
  },
  {
    _id: 12,
    title: 'Fool',
    author: {
      firstName: 'Christopher',
      lastName: 'Moore'
    }
  },
  {
    _id: 13,
    title: 'Incompetence',
    author: {
      firstName: 'Rob',
      lastName: 'Grant'
    }
  },
  {
    _id: 14,
    title: 'Fat',
    author: {
      firstName: 'Rob',
      lastName: 'Grant'
    }
  },
  {
    _id: 15,
    title: 'The Grand Design',
    author: {
      firstName: 'Stephen',
      lastName: 'Hawking'
    }
  }
]

describe('the search engine', () => {
  it('should return empty array when no keys are defined', () => {
    const actual = search(testData)('test')

    expect(actual).to.be.empty
  })

  it('should return empty array when searching for "Hawking" with author.firstName as keys', () => {
    const actual = search(testData)('Hawking', { keys: ['author.firstName'] })

    expect(actual).to.be.empty
  })

  it('should return [15] when searching for "Hawking" with author.lastName as keys', () => {
    const expected = ['15']
    const actual = search(testData)('Hawking', { keys: ['author.lastName'] })

    expect(actual).to.deep.equal(expected)
  })

  it('should return an array of XX when searching for "Gran" with all keys', () => {
    const expectedLength = 2
    const actual = search(testData)('Gran', {
      keys: ['title', 'author.firstName', 'author.lastName']
    })

    expect(actual).to.have.length(expectedLength)
  })
})
