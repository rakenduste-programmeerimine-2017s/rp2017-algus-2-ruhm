const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET', () => {
    it('it should GET all the words', done => {
      supertest
      .get('/api/words')
      .expect(200, done)
    })
  })
}
