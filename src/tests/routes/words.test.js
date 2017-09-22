/* globals describe, it */
const expect = require('chai').expect

module.exports = (supertest) => {
  describe('/GET', () => {
    it('it should GET all the words', done => {
      supertest
        .get('/api/words')
        .expect(200, done)
    })
  })

  describe('/POST', () => {
    it('it should save new word', done => {
      supertest
        .post('/api/words')
        .send({ name: 'tere' })
        .expect(201, done)
    })

    it('it should note save new word if no name', done => {
      supertest
        .post('/api/words')
        .send({ })
        .expect(422, done)
    })

    it('it should note save new word if name shorter than 2', done => {
      supertest
        .post('/api/words')
        .send({ name: 'a' })
        .expect(422, done)
    })

    it('it should note save new word if name is not alphanumerical', done => {
      supertest
        .post('/api/words')
        .send({ name: 'tere 123 @' })
        .expect(422, done)
    })
  })
}
