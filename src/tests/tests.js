/* globals describe, before */
const server = require('../index.js')
const supertest = require('supertest')(server)

const Word = require('../models/words')

describe('/api', () => {
  before(async () => {
    await Word.remove({})
  })
  describe('/words', () => require('./routes/words.test.js')(supertest))
})
