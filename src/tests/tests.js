const server = require('../index.js')
const supertest = require('supertest')(server)

describe('/api', () => {
  describe('/words', () => require('./routes/words.test.js')(supertest))
})
